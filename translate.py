import io
import os
import html
import epitran

# Imports the Google Cloud client libraries
from google.api_core.protobuf_helpers import get_messages
from google.cloud import translate_v3beta1 as translate
from google.cloud import vision
from google.colab import drive
from firebase import firebase


drive.mount('/content/gdrive')
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="/content/gdrive/My Drive/qhacks/qhacks2020-fca94e2d0136.json"

class newTr:
    def __init__(self, inFile):
        self.img = inFile
        self.firebase = firebase.FirebaseApplication('https://xxxxx.firebaseio.com/', None)  

    def putImage(self):
      storage = firebase.storage()
      storage.child().put


    def pic_to_text(self):
        """Detects text in an image file
        ARGS
        infile: path to image file

        RETURNS
        String of text detected in image
        """

        # Instantiates a client
        client = vision.ImageAnnotatorClient()

        # Opens the input image file
        with io.open(self.img, 'rb') as image_file:
            content = image_file.read()

        image = vision.types.Image(content=content)

        # For dense text, use document_text_detection
        # For less dense text, use text_detection
        response = client.document_text_detection(image=image)
        text = response.full_text_annotation.text

        return text

    def translate_text(self, text, source_language_code, target_language_code,
                    project_id):
        """Translates text to a given language using a glossary

        ARGS
        text: String of text to translate
        source_language_code: language of input text
        target_language_code: language of output text
        project_id: GCP project id
        glossary_name: name you gave your project's glossary
            resource when you created it

        RETURNS
        String of translated text
        """

        # Instantiates a client
        client = translate.TranslationServiceClient()

        # Designates the data center location that you want to use
        location = 'us-central1'

        parent = client.location_path(project_id, location)

        result = client.translate_text(
            parent=parent,
            contents=[text],
            mime_type='text/plain',  # mime types: text/plain, text/html
            source_language_code=source_language_code,
            target_language_code=target_language_code)

        print(result)
        # Extract translated text from API response
        return result

        def ipa(self):
          ipa_list = []
          for word in translated:

            ipa_list.append(symbol)

        def data(self):
          data = {
              "Image" : self.img,
              "OriginalText" : text_to_translate,
              "TranslatedText" : translated,
              "IPA" : translated.ipa()
          }
          result = firebase.post('https://qhacks2020-86c07.firebaseio.com')

def main():
    # Photo from which to extract text
    new = newTr('/content/gdrive/My Drive/qhacks/surveillance.jpeg')
    # photo -> detected text
    text_to_translate = new.pic_to_text()
    print(text_to_translate)
    translated = new.translate_text(text_to_translate, 'fr', 'en', 'qhacks2020-86c07')

if __name__=="__main__":
    main()
