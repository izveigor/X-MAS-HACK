import nltk
import tika

from broker.consumer import Consumer

if __name__ == "__main__":
    nltk.download("stopwords")
    nltk.download("wordnet")
    tika.initVM()
    Consumer().start()
