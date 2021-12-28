used model sequitur-g2p for convert graphemes to phonemes:

https://github.com/sequitur-g2p/sequitur-g2p

#create train.lex and test.lex
#create words.txt with the list of words without any spaces, special chars

#create unigram model
g2p.py --train train.lex --devel 5% --write-model model-1

#to create higher order models
g2p.py --model model-1 --ramp-up --train train.lex --devel 5% --write-model model-2

#repeat this a couple of times:
g2p.py --model model-2 --ramp-up --train train.lex --devel 5% --write-model model-3
g2p.py --model model-3 --ramp-up --train train.lex --devel 5% --write-model model-4
...

#created 8 models, 8th one performs better

