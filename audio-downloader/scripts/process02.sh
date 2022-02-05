# create ctm-file

fname=${1}

cmd="cat ${fname} \
	| sed 's/[0-9][0-9]*/ & /g'  \
	| sed 's/ ء / /g' \
	| sed 's/\// /g' \
	| sed 's/‘/ /g' \
	| sed 's/’/ /g' \
	| sed 's/،/ /g' \
	| sed 's/“/ /g' \
	| sed 's/”/ /g' \
	| sed 's/ﷺ/ /g' \
	| sed 's/-/ /g' \
	| sed 's/ٴ/ /g' \
	| sed 's/:/ /g' \
	| sed 's/\./ /g' \
	| sed 's/؟/ /g' \
	| sed 's/!/ /g' \
	| sed \"s/'/ /g\" \
	| sed 's/\؛/ /g' \
	| sed 's/)/ /g' \
	| sed 's/(/ /g' \
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
	> ${fname}2 "
#echo $cmd
eval $cmd

cmd="cat ${fname}2 \
 | sed  's/hazaar/ /g' \
 | sed  's/ 000/ /g' \
 | sed  's/ 00/ /g' \
 | sed  's/ 0/ /g' \
 | sed  's/saou/ /g' \
 | sed  's/ 00/ /g' \
 | sed  's/ 0/ /g' \
 | sed  's/|/ /g' \
 | sed  's/| / /g' \
 | sed  's/�/ /g' \
 | sed  's/ |/ /g' \
	> ${fname}3 "
#echo $cmd
eval $cmd

cmd="cat ${fname}3 \
 | tr '\n' ' ' \
 | perl -pe 's/\r/ /g' \
	> ${fname}4 "
#echo $cmd
eval $cmd

mv ${fname} ${fname}0
mv ${fname}4 ${fname}

rm ${fname}?
