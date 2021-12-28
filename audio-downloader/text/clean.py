import csv


def cleanString(str):
    str = str.strip()
    str = str.strip('"')
    str = str.strip('.')
    str = str.strip('\n')
    return str.lower()


f = open('./data.csv', 'r')
lines = f.readlines()
sentences = []
unique_sentences = []

for i in lines:
    sentences.append(i.split(',')[1])
for j in sentences:
    if j not in unique_sentences:
        unique_sentences.append(j)


unique_words = set()

for k in unique_sentences:
    words_of_sentence = k.split(' ')
    for word in words_of_sentence:
        if(word not in unique_words):
            if(word != '' and word != ' ' and word not in unique_words):
                unique_words.add(cleanString(word))

print("Number of unique words: ", len(unique_words))
#-----------------------------------------------------------------

with open('example.csv', 'w', newline='') as result:
    writer = csv.writer(result)
    for word in unique_words:
        x = []
        if(word != '' and word != ' ' and word != "\n" and word not in x):
            x.append(word)
        if(len(x) > 0):

            writer.writerow(x)
