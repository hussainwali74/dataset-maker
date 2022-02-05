# create ctm-file

fname=${1}

cmd="cat ${fname} \
	| sed 's/[0-9][0-9]*/ & /g'  \
	| sed 's/ ء / /g' \
	| sed 's/\// /g' \
	| sed 's/ہ/ه/g' \
	| sed 's/‘/ /g' \
	| sed 's/’/ /g' \
	| sed 's/،/ /g' \
	| sed 's/ئ/ء/g' \
	| sed 's/“/ /g' \
	| sed 's/”/ /g' \
	| sed 's/ﷺ/ /g' \
	| sed 's/-/ /g' \
	| sed 's/۔/\n/g' \
	| sed 's/ٴ/ /g' \
	| sed 's/:/ /g' \
	| sed 's/\./ /g' \
	| sed 's/؟/ /g' \
	| sed 's/!/ /g' \
	| sed \"s/'/ /g\" \
	| sed 's/\؛/ /g' \
	| sed 's/)/ /g' \
	| sed 's/(/ /g' \
	| sed 's/ؤ/ءو/g' \
	| sed 's/ۓ/ءے/g' \
	| sed 's/%/ /g' \
	| sed 's/\^/ /g' \
	> ${fname}1 "
#echo $cmd
eval $cmd


cmd="cat ${fname}1 \
	| sed 's/\xd9\x8f//g' \
	| sed 's/\xd9\x91//g' \
	| sed 's/\xd9\x92//g' \
	| sed 's/\xd9\x8e//g' \
	| sed 's/\xd9\x90//g' \
	| sed 's/\xd9\xb0//g' \
	| sed 's/\xd9\x8b//g' \
	| sed 's/\xEF\xBB\xBF//' \
	| sed 's/\xd8\xa3/\xd8\xa7/g' \
	| sed 's/ي/ی/g' \
	| sed 's/۱/1/g' \
	| sed 's/۲/2/g' \
	| sed 's/۳/3/g' \
	| sed 's/۴/4/g' \
	| sed 's/۵/5/g' \
	| sed 's/٦/6/g' \
	| sed 's/۷/7/g' \
	| sed 's/۸/8/g' \
	| sed 's/۹/9/g' \
	| sed 's/۰/0/g' \
	| sed 's/۶/ء/g' \
	> ${fname}2 "
#echo $cmd
eval $cmd



cmd="cat ${fname}2 \
 | sed  's/ [0-9][0-9][0-9][0-9] / hazaar& /g' \
 | sed  's/ hazaar [0-9]/& هزار /g' \
 | sed  's/hazaar/ /g' \
 | sed  's/ 000/ /g' \
 | sed  's/ 00/ /g' \
 | sed  's/ 0/ /g' \
 | sed  's/ [0-9][0-9][0-9] / saou& /g' \
 | sed  's/ saou [0-9]/& سو /g' \
 | sed  's/saou/ /g' \
 | sed  's/ 00/ /g' \
 | sed  's/ 0/ /g' \
	> ${fname}3 "
#echo $cmd
eval $cmd


cmd="cat ${fname}3 \
 | sed  's/ 1 / ایک /g' \
 | sed  's/ 2 / دو /g' \
 | sed  's/ 3 / تین /g' \
 | sed  's/ 4 / چار /g' \
 | sed  's/ 5 / پانچ /g' \
 | sed  's/ 6 / چھ /g' \
 | sed  's/ 7 / سات /g' \
 | sed  's/ 8 / آٹھ /g' \
 | sed  's/ 9 / نو /g' \
 | sed  's/ 10 / دس /g' \
 | sed  's/ 11 / گیاره /g' \
 | sed  's/ 12 / باره /g' \
 | sed  's/ 13 / تیره /g' \
 | sed  's/ 14 / چوده /g' \
 | sed  's/ 15 / پندره /g' \
 | sed  's/ 16 / سوله /g' \
 | sed  's/ 17 / ستره /g' \
 | sed  's/ 18 / اٹھاره /g' \
 | sed  's/ 19 / انیس /g' \
 | sed  's/ 20 / بیس /g' \
 | sed \"s/\ \ \ / /g\" \
 | sed  's/ ایک هزار نو سو / انیس سو /g' \
	> ${fname}4 "
#echo $cmd
eval $cmd

cmd="cat ${fname}4 \
 | sed 's/ 21 / اکیس /g'  \
 | sed 's/ 22 / باءیس /g'  \
 | sed 's/ 23 / تءیس /g'  \
 | sed 's/ 24 / چوبیس /g'  \
 | sed 's/ 25 / پچیس /g'  \
 | sed 's/ 26 / چھبیس /g'  \
 | sed 's/ 27 / ستاءیس /g'  \
 | sed 's/ 28 / اٹھاءیس /g'  \
 | sed 's/ 29 / انتیس /g'  \
 | sed 's/ 30 / تیس /g'  \
 | sed 's/ 31 / اکتیس /g'  \
 | sed 's/ 32 / بتیس /g'  \
 | sed 's/ 33 / تینتیس /g'  \
 | sed 's/ 34 / چونتیس /g'  \
 | sed 's/ 35 / پینتیس /g'  \
 | sed 's/ 36 / چھتیس /g'  \
 | sed 's/ 37 / سینتیس /g'  \
 | sed 's/ 38 / اڑتیس /g'  \
 | sed 's/ 39 / انتالیس /g'  \
 | sed 's/ 40 / چالیس /g'  \
 | sed 's/ 41 / اکتالیس /g'  \
 | sed 's/ 42 / بیالیس /g'  \
 | sed 's/ 43 / تنتالیس /g'  \
 | sed 's/ 44 / چونتالیس /g'  \
 | sed 's/ 45 / پنتالیس /g'  \
 | sed 's/ 46 / چھیالیس /g'  \
 | sed 's/ 47 / سنتالیس /g'  \
 | sed 's/ 48 / اڑتالیس /g'  \
 | sed 's/ 49 / انچاس /g'  \
 | sed 's/ 50 / پچاس /g'  \
	> ${fname}5 "
#echo $cmd
eval $cmd

cmd="cat ${fname}5 \
 | sed 's/ 51 / اکیاون /g'  \
 | sed 's/ 52 / باون /g'  \
 | sed 's/ 53 / تریپن /g'  \
 | sed 's/ 54 / چون /g'  \
 | sed 's/ 55 / پچپن /g'  \
 | sed 's/ 56 / چھپن /g'  \
 | sed 's/ 57 / ستاون /g'  \
 | sed 's/ 58 / اٹھاون /g'  \
 | sed 's/ 59 / انسٹھ /g'  \
 | sed 's/ 60 / ساٹھ /g'  \
 | sed 's/ 61 / اکسٹھ /g'  \
 | sed 's/ 62 / باسٹھ /g'  \
 | sed 's/ 63 / تریسٹھ /g'  \
 | sed 's/ 64 / چونسٹھ /g'  \
 | sed 's/ 65 / پینسٹھ /g'  \
 | sed 's/ 66 / چھیاسٹھ /g'  \
 | sed 's/ 67 / سڑسٹھ /g'  \
 | sed 's/ 68 / اڑسٹھ /g'  \
 | sed 's/ 69 / انهتر /g'  \
 | sed 's/ 70 / ستر /g'  \
 | sed 's/ 71 / اکهتر /g'  \
 | sed 's/ 72 / بهتر /g'  \
 | sed 's/ 73 / تهتر /g'  \
 | sed 's/ 74 / چوهتر /g'  \
 | sed 's/ 75 / پچھتر /g'  \
 | sed 's/ 76 / چھهتر /g'  \
 | sed 's/ 77 / ستتر /g'  \
 | sed 's/ 78 / اٹھتر /g'  \
 | sed 's/ 79 / اناسی /g'  \
 | sed 's/ 80 / اسی /g'  \
	> ${fname}6 "
#echo $cmd
eval $cmd

cmd="cat ${fname}6 \
 | sed 's/ 81 / اکیاسی /g'  \
 | sed 's/ 82 / بیاسی /g'  \
 | sed 's/ 83 / تراسی /g'  \
 | sed 's/ 84 / چوراسی /g'  \
 | sed 's/ 85 / پچاسی /g'  \
 | sed 's/ 86 / چھیاسی /g'  \
 | sed 's/ 87 / ستاسی /g'  \
 | sed 's/ 88 / اٹھاسی /g'  \
 | sed 's/ 89 / نواسی /g'  \
 | sed 's/ 90 / نوے /g'  \
 | sed 's/ 91 / اکیانوے /g'  \
 | sed 's/ 92 / بانوے /g'  \
 | sed 's/ 93 / ترانوے /g'  \
 | sed 's/ 94 / چورانوے /g'  \
 | sed 's/ 95 / پچانوے /g'  \
 | sed 's/ 96 / چھیانوے /g'  \
 | sed 's/ 97 / ستانوے /g'  \
 | sed 's/ 98 / اٹھانوے /g'  \
 | sed 's/ 99 / ننانوے /g'  \
	> ${fname}7 "
#echo $cmd
eval $cmd


cmd="cat ${fname}7 \
 | tr '\n' ' ' \
 | perl -pe 's/\r/ /g' \
	> ${fname}8 "
#echo $cmd
eval $cmd

mv ${fname} ${fname}0
mv ${fname}8 ${fname}

rm ${fname}?



