const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

ffmpeg('src/assets/savethedatenuovo.mp4')
  .screenshots({
    count: 1,
    timestamps: ['00:00:00.001'],
    folder: 'src/assets',
    filename: 'savethedatenuovo-poster-clean.jpg'
  })
  .on('end', () => {
    console.log('Frame extracted successfully.');
  })
  .on('error', (err) => {
    console.error('Error:', err);
  });
