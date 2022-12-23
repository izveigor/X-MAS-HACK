import pickle
from features.constants import MODEL_PATH, TYPES
from nltk.stem import WordNetLemmatizer
from features.singleton import Singleton
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from collections import Counter
import re
import tika
from tika import parser
from broker.publisher import SentData, Publisher


lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('russian'))
vectorizer = TfidfVectorizer()


class Model(metaclass=Singleton):
    def __init__(self):
        with open(MODEL_PATH, 'rb') as file:
            self.model = pickle.load(file)

    def _read_document(file):
        parsed = parser.from_file(file)
        content = parsed["content"]
        return content

    def _cleaning(doc):
        text = ""
        for word in doc:
            token = re.sub("[^А-Яа-я\n ']+", '', str(word)).lower()
            if token:
                token = re.sub("\n", " ", token)
                text += token
        text = ' '.join(text.split())

        cleaned_field = []
        for word in text.split():
            lemma_ = lemmatizer.lemmatize(word)
            if lemma_ not in stop_words:
                cleaned_field.append(lemma_)

        return cleaned_field

    def _vectorize(self, doc):
        text = self._cleaning(doc)
        key_phrases = list(Counter(text.split()).most_common())[:5]
        vectors = vectorizer.transform([" ".join(text)])
        return vectors, key_phrases

    def predict(self, id_, document):
        content = self._read_document(document)
        cleaned_text = self._cleaning(content)
        vectors, key_phrases = self._vectorize(cleaned_text)
        y_pred_proba = self.model.predict_proba(vectors)
        Publisher.publish(SentData(
            id=id_,
            scores=[score for score in y_pred_proba[0]],
            types=TYPES,
            key_phrases=key_phrases,
        ))
