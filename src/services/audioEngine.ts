export class AudioEngine {
  private ctx: AudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  private filter: BiquadFilterNode = this.ctx.createBiquadFilter();
  private reverb: GainNode = this.ctx.createGain();
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];

  constructor() {
    this.filter.type = 'lowpass';
    this.filter.connect(this.reverb).connect(this.ctx.destination);
  }

  updateEffects(x: number, y: number) {
    this.filter.frequency.setTargetAtTime(200 + (x * 15000), this.ctx.currentTime, 0.1);
    this.reverb.gain.setTargetAtTime(y, this.ctx.currentTime, 0.1);
  }

  startRecording(stream: MediaStream) {
    this.chunks = [];
    this.recorder = new MediaRecorder(stream);
    this.recorder.ondataavailable = (e) => this.chunks.push(e.data);
    this.recorder.start();
  }

  stopAndDownload() {
    if (!this.recorder) return;
    this.recorder.onstop = () => {
      const blob = new Blob(this.chunks, { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VocalSynth_Session.wav`;
      a.click();
    };
    this.recorder.stop();
  }
}
