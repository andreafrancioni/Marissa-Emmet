#!/bin/bash

# Compress savethedatenuovo.mp4
echo "Compressing savethedatenuovo.mp4..."
ffmpeg -i src/assets/savethedatenuovo.mp4 -vcodec libx264 -crf 28 -preset fast -y src/assets/savethedatenuovo_compressed.mp4
if [ $? -eq 0 ]; then
    mv src/assets/savethedatenuovo_compressed.mp4 src/assets/savethedatenuovo.mp4
fi

# Compress villa-mangiacane.mp4
echo "Compressing villa-mangiacane.mp4..."
ffmpeg -i src/assets/villa-mangiacane.mp4 -vcodec libx264 -crf 28 -preset fast -y src/assets/villa-mangiacane_compressed.mp4
if [ $? -eq 0 ]; then
    mv src/assets/villa-mangiacane_compressed.mp4 src/assets/villa-mangiacane.mp4
fi

# Compress savethedateemmetmarissa.mp4
echo "Compressing savethedateemmetmarissa.mp4..."
ffmpeg -i src/assets/savethedateemmetmarissa.mp4 -vcodec libx264 -crf 28 -preset fast -y src/assets/savethedateemmetmarissa_compressed.mp4
if [ $? -eq 0 ]; then
    mv src/assets/savethedateemmetmarissa_compressed.mp4 src/assets/savethedateemmetmarissa.mp4
fi

echo "Video compression complete."
