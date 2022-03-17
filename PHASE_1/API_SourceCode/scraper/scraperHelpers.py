import re
import spacy # CHECK INSTALLATION INSTRUCTIONS AT SPACY.IO
from dateutil.parser import parse # WILL ALSO NEED TO BE INSTALLED

keyTerms = ['Outbreak', 'Infection', 'Fever', 'Virus', 'Epidemic', 'Infectious', 'Illness', 'Bacteria', 'Emerging', 'Unknown virus', 'Mystery disease', 'Mysterious disease', 'Zika', 'MERS', 'Salmonella', 'Legionnaire', 'Measles', 'Hantavirus', 'Rift Valley Fever', 'Crimean Congo Hemorrhagic Fever Dengue', 'Ebola', 'Marburg', 'Tularemia', 'Junin Fever', 'Machupo Fever', 'Guanarito Fever', 'Chapare Fever', 'Lassa Fever', 'Lujo Fever', 'Anthrax', 'Botulism', 'Plague', 'Smallpox', 'Pox']

nlp = spacy.load('en_core_web_sm')

def findKeyTerms(rawText):
    keyTermMatches = []
    for keyTerm in keyTerms:
        match = re.findall(keyTerm, rawText, re.IGNORECASE)
        if match:
            keyTermMatches.append(keyTerm)
    return keyTermMatches

def findLocations(rawText):
    locations = []
    doc = nlp(rawText)
    for ent in doc.ents:
        if ent.label_ == "GPE":
            if ent.text not in locations:
                locations.append(ent.text)
    return locations

def findDates(rawText):
    dates = []
    doc = nlp(rawText)
    for ent in doc.ents:
        if ent.label_ == "DATE":
            if ent.text not in dates:
                try:
                    dates.append(parse(ent.text))
                except:
                    continue
    return dates

################ FOR TESTING PURPOSES: #################

testString = "For the past 20 years, Amy Kuenzi has Salmonella in New Zealand. spent 3 days in Sydney of every month traveling to a ranch near Gregson, Montana, and setting out traps that contain peanut butter and oats in New South Wales. Epidemic Her quarry is deer mice in London. She takes blood samples, looks for scars and fleas, infectious and attaches ear tags 10-01-2020. E. COLI EHEC - FRANCE (02): HEMOLYTIC UREMIC SYNDROME, FATAL"

matches = findKeyTerms(testString)
locations = findLocations(testString)

print(matches)
print(locations)
for date in findDates(testString):
    print(date.strftime('%Y-%m-%d')) # This only gets date, not the time too

