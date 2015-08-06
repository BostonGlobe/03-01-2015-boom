#!/bin/bash

images=data/image*.png

echo 'filename,width,height';

for i in $images
do
	dimensions=$(identify -format '%w,%h' $i);
	echo $i','$dimensions;
done
