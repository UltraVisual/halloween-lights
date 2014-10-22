#!/bin/sh

echo "<<<<< getting mplayer >>>>>>>>"
apt-get install -y mplayer

echo "<<<<< getting libasound2-dev >>>>>>>>"
apt-get install -y libasound2-dev

echo "<<<<< getting music files from dropbox >>>>>>>>"
wget https://www.dropbox.com/s/d2dhuqi9wahxqf1/music.zip
unzip music.zip
rm music.zip
