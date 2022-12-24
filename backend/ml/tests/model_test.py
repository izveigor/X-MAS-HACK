import pickle
from unittest.mock import Mock, patch

import pytest

from broker.publisher import SentData
from features.constants import TYPES
from model.model import DocumentModel


class TestModel:
    text = "Симфония ми-бемоль мажор — крупное произведение для симфонического оркестра российского композитора-романтика Петра Ильича Чайковского. @wikipedia"
    lemmatized_text = [
        "симфония",
        "мибемоль",
        "мажор",
        "крупное",
        "произведение",
        "симфонического",
        "оркестра",
        "российского",
        "композитораромантика",
        "петра",
        "ильича",
        "чайковского",
    ]
    key_phrases = ["симфония", "мибемоль", "мажор", "крупное", "произведение"]

    def test_read_document(self) -> None:
        with open("./tests/data.pkl", "rb") as f:
            data = pickle.load(f)
        content = DocumentModel()._read_document(data)
        content = content.replace("\n", "")
        content = content.replace('"', "")
        assert content == self.text

    def test_cleaning(self) -> None:
        cleaned_text = DocumentModel()._cleaning(self.text)
        assert cleaned_text == self.lemmatized_text

    def test_vectorize(self) -> None:
        _, key_phrases = DocumentModel()._vectorize(self.lemmatized_text)
        assert key_phrases == self.key_phrases

    @patch("model.model.Publisher.publish")
    @patch("model.model.Publisher.__init__", return_value=None)
    def test_predict(
        self,
        mock__init__: Mock,
        mock_publish: Mock,
    ) -> None:
        id_ = "12345"
        with open("./tests/data.pkl", "rb") as f:
            document = pickle.load(f)
        DocumentModel().predict(id_, document)
        mock_publish.assert_called_once_with(
            SentData(
                id=id_,
                scores=[0.06, 0.1, 0.17, 0.06, 0.61],
                types=TYPES,
                key_phrases=self.key_phrases,
            )
        )
