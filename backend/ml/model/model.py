import pickle
import re
from collections import Counter

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from scipy.sparse._csr import csr_matrix
from sklearn.feature_extraction.text import TfidfVectorizer
from tika import parser

from broker.publisher import Publisher, SentData
from features.constants import MODEL_PATH, TIKA_URL, TYPES, VECTORIZER_PATH
from features.singleton import Singleton

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("russian"))
vectorizer = TfidfVectorizer()


class DocumentModel(metaclass=Singleton):
    def __init__(self) -> None:
        with open(MODEL_PATH, "rb") as file:
            self.model = pickle.load(file)

        with open(VECTORIZER_PATH, "rb") as file:
            self.vectorizer = pickle.load(file)

    @staticmethod
    def _read_document(file: bytes) -> str:
        parsed = parser.from_buffer(file, TIKA_URL)
        content: str = parsed["content"]
        return content

    @staticmethod
    def _cleaning(doc: str) -> list[str]:
        text = ""
        for word in doc:
            token = re.sub("[^А-Яа-я\n ']+", "", str(word)).lower()
            if token:
                token = re.sub("\n", " ", token)
                text += token
        text = " ".join(text.split())

        cleaned_field = []
        for word in text.split():
            lemma_ = lemmatizer.lemmatize(word)
            if lemma_ not in stop_words:
                cleaned_field.append(lemma_)

        return cleaned_field

    def _vectorize(self, cleaned_text: list[str]) -> tuple[csr_matrix, list[str]]:
        key_phrases = [word[0] for word in list(Counter(cleaned_text).most_common())[:5]]
        vectors = self.vectorizer.transform([" ".join(cleaned_text)])
        return vectors, key_phrases

    def predict(self, id_: str, document: bytes) -> None:
        content = self._read_document(document)
        cleaned_text = self._cleaning(content)
        vectors, key_phrases = self._vectorize(cleaned_text)
        y_pred_proba = self.model.predict_proba(vectors)

        y_pred_array = []
        for string in y_pred_proba:
            y_pred_array.append(string[0][1])

        Publisher().publish(
            SentData(
                id=id_,
                scores=y_pred_array,
                types=TYPES,
                key_phrases=key_phrases,
            )
        )
