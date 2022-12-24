from typing import Any, Generator

import nltk
import pytest


@pytest.fixture(scope="function")
def download() -> Generator[Any, Any, Any]:
    nltk.download("stopwords")
    nltk.download("wordnet")
    yield
