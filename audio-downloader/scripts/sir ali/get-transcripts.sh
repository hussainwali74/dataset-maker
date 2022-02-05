#!/bin/bash

a=1

for d in ~/kaldi/transcribed4/173*; do
	echo $d;
	n=$(echo $d | sed 's/.*\///g')
	nf=${n}-20160925-$(cat letters.txt | sed -n ${a}p)
	echo $n $a $nf
	mkdir -p extracted/$nf/wav
	mkdir -p extracted/$nf/etc;
	rm -f extracted/$nf/etc/prompts-original;
	rm -f extracted/$nf/etc/PROMPTS;
	cat ~/kaldi/README | sed "s/akiplaner/${n}/g" >  extracted/$nf/etc/README

	for f in $d/*.wav; do
		n2=$(echo $f | sed 's/.*\///g')
		n3=$(echo $n2 | sed 's/\.wav//g')
		echo $n2;
		echo $n3;
		cp $f extracted/$nf/wav/$n2;
		#sox --vol 0.01 $f -t wav extracted/$nf/wav/$n2;
		normalize-audio -a 0.3 extracted/$nf/wav/$n2;
		
		cp $d/$n3.txt temp.txt
		./process02.sh temp.txt

		echo "$n3 $(cat temp.txt )" >> extracted/$nf/etc/prompts-original;
		echo "${nf}/mfc/${n3} $(cat temp.txt )" >> extracted/$nf/etc/PROMPTS;
	done;
	a=$(($a + 1));
done;	

