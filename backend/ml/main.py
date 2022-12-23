from broker.consumer import Consumer
import tika
import nltk

if __name__ == "__main__":
    nltk.download('stopwords')
    nltk.download('wordnet')
    tika.initVM()
    Consumer().start()
