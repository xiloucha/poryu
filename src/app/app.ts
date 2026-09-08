import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';

type Language = 'ja' | 'zh' | 'ko' | 'en';

type TaskStatus =
  | 'todo'
  | 'later'
  | 'todayOff'
  | 'buried'
  | 'sprouted'
  | 'completed'
  | 'released'
  | 'delegated'
  | 'unknown'
  | 'questioned';

type ArchiveReason =
  | 'completed'
  | 'released'
  | 'delegated'
  | 'unknown'
  | 'questioned'
  | null;

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  face: string;
  originalFace: string;
  archiveDate: string | null;
  archiveReason: ArchiveReason;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  newTask = '';

  language: Language = 'ja';

  selectedTask: Task | null = null;

  tasks: Task[] = [];

  faces = [
    '(・∀・)',
    '(´・ω・`)',
    '(・ω・)',
    '(｡･ω･｡)',
    '(´ω｀)',
    '(・ω・)',
    '(¬‿¬)',
    '(•ᴗ•)',
    '(ᵔ ᵕ ᵔ)',
    '(๑˃ᴗ˂)ﻭ',
    '(*ˊᗜˋ*)',
    '(⁰▿⁰)',
    '(≧▽≦)',
    '(´꒳`)',
    '(｡•ㅅ•｡)',
    '( ˶ˆ꒳ˆ˵ )',
    '(◍•ᴗ•◍)',
    '(´•ω•`)',
    '( ᵕᴗᵕ )',
    '(´-ω-`)',
    '(っ˘ω˘ς)',
    '(´･ω･`)',
    '(´・_・`)',
    '(╥﹏╥)',
    '(´；ω；`)',
    '(´-﹏-`)',
    '(¬‿¬)',
    '(￣▽￣)',
    '(￣ω￣)',
    '(・ω・)',
    '(´▽`)',
    '(^_^)',
    '(≧◡≦)',
    '(・△・)',
    '(´△`)',
    '(・□・)',
    '(´□`)',
    '(・◇・)',
    '(´◇`)',
    '(・▽・)',
    '(´▽`)',
    '(・д・)',
    '(´д`)',
    '(・Д・)',
    '(´Д`)',
    '(・з・)',
    '(´з`)',
    '(・3・)',
    '(´3`)'
  ];

  sleepingFace = '( ˘ω˘ )';

  @ViewChild('logoCanvas')
  logoCanvas!: ElementRef<HTMLCanvasElement>;

  texts: Record<string, Record<Language, string>> = {

    subtitle: {
      ja: '保留するためのToDo',
      zh: '用来暂存的待办事项',
      ko: '보류하기 위한 할 일',
      en: 'To-do for putting things on hold'
    },

    inputPlaceholder: {
      ja: 'やることを入力',
      zh: '输入要做的事',
      ko: '할 일을 입력하세요',
      en: 'Something to do'
    },

    today: {
      ja: '今日やる',
      zh: '今天做',
      ko: '오늘 하기',
      en: 'Do today'
    },

    later: {
      ja: 'あとでやる',
      zh: '以后做',
      ko: '나중에 하기',
      en: 'Do later'
    },

    todayOff: {
      ja: '今日はやらない',
      zh: '今天不做',
      ko: '오늘은 하지 않기',
      en: 'Not today'
    },

    underground: {
      ja: '土の中',
      zh: '土里',
      ko: '흙 속',
      en: 'Underground'
    },

    sprouted: {
      ja: '芽が出ました',
      zh: '发芽了',
      ko: '싹이 났습니다',
      en: 'It sprouted'
    },

    sprout: {
      ja: '芽を出す',
      zh: '发芽',
      ko: '싹을 틔우기',
      en: 'Sprout'
    },

    pullOut: {
      ja: '引っこ抜く',
      zh: '拔出来',
      ko: '뽑아내기',
      en: 'Pull it out'
    },

    rest: {
      ja: 'もう少し休ませる',
      zh: '再让它休息一会儿',
      ko: '조금 더 쉬게 하기',
      en: 'Let it rest'
    },

    completed: {
      ja: 'やった！',
      zh: '做到了！',
      ko: '했다!',
      en: 'Done!'
    },

    archive: {
      ja: 'アーカイブ',
      zh: '归档',
      ko: '아카이브',
      en: 'Archive'
    },

    archiveTitle: {
      ja: '📦 アーカイブ',
      zh: '📦 归档',
      ko: '📦 아카이브',
      en: '📦 Archive'
    },

    archiveIntro: {
      ja: 'これまでに決めたこと',
      zh: '至今做出的决定',
      ko: '지금까지 내린 결정',
      en: 'Things you decided'
    },

    delegated: {
      ja: '誰かがやる',
      zh: '让别人做',
      ko: '누군가가 하기',
      en: 'Let someone else do it'
    },

    unknown: {
      ja: '……知らん',
      zh: '……不知道',
      ko: '……모르겠다',
      en: '…I don’t know'
    },

    released: {
      ja: 'そもそも必要なかった',
      zh: '本来就没必要',
      ko: '애초에 필요 없었다',
      en: 'It wasn’t necessary anyway'
    },

    questioned: {
      ja: 'なぜこれをToDoに入れた？',
      zh: '为什么把这个放进待办？',
      ko: '왜 이걸 할 일에 넣었지?',
      en: 'Why did I put this on my To-do?'
    },

    empty: {
      ja: 'まだタスクはありません。',
      zh: '还没有任务。',
      ko: '아직 할 일이 없습니다.',
      en: 'No tasks yet.'
    },

    bury: {
      ja: '土に埋める',
      zh: '埋进土里',
      ko: '흙에 묻기',
      en: 'Bury it'
    }

  };

  addTask(): void {
    const title = this.newTask.trim();

    if (!title) {
      return;
    }

    const randomFace =
      this.faces[
        Math.floor(Math.random() * this.faces.length)
      ];

    const task: Task = {
      id: Date.now(),
      title,
      status: 'todo',
      face: randomFace,
      originalFace: randomFace,
      archiveDate: null,
      archiveReason: null
    };

    this.tasks.push(task);
    this.newTask = '';
  }

  setLanguage(language: Language): void {
    this.language = language;
  }

  getText(key: string): string {
    return this.texts[key]?.[this.language] ?? '';
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
  }

  closeTask(): void {
    this.selectedTask = null;
  }

  decide(action: TaskStatus): void {
    if (!this.selectedTask) {
      return;
    }

    this.selectedTask.status = action;

    if (action === 'buried') {
      this.selectedTask.face = this.sleepingFace;
    } else {
      this.selectedTask.face = this.selectedTask.originalFace;
    }

    if (
      action === 'completed' ||
      action === 'released' ||
      action === 'delegated' ||
      action === 'unknown' ||
      action === 'questioned'
    ) {

      this.selectedTask.archiveDate = this.getToday();

      if (action === 'completed') {
        this.selectedTask.archiveReason = 'completed';
      }

      if (action === 'released') {
        this.selectedTask.archiveReason = 'released';
      }

      if (action === 'delegated') {
        this.selectedTask.archiveReason = 'delegated';
      }

      if (action === 'unknown') {
        this.selectedTask.archiveReason = 'unknown';
      }

      if (action === 'questioned') {
        this.selectedTask.archiveReason = 'questioned';
      }
    }

    this.selectedTask = null;
  }

  sprout(task: Task): void {
    task.status = 'sprouted';
    task.face = task.originalFace;
  }

  rest(task: Task): void {
    task.status = 'buried';
    task.face = this.sleepingFace;
  }

  pullOut(task: Task): void {
    task.status = 'todo';
    task.face = task.originalFace;
    this.selectedTask = task;
  }

  archive(task: Task): void {
    task.status = 'released';
    task.archiveDate = this.getToday();
    task.archiveReason = 'completed';
  }

  getToday(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  formatArchiveDate(date: string | null): string {
    if (!date) {
      return '';
    }

    const parts = date.split('-');

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    if (this.language === 'en') {
      return `${month}/${day}/${year}`;
    }

    if (this.language === 'zh') {
      return `${year}年${month}月${day}日`;
    }

    if (this.language === 'ko') {
      return `${year}.${month}.${day}`;
    }

    return `${month}月${day}日`;
  }

  get archiveMonths(): string[] {
    const months = this.archivedTasks
      .map(task =>
        task.archiveDate
          ? task.archiveDate.substring(0, 7)
          : null
      )
      .filter(
        (month): month is string =>
          month !== null
      );

    return [...new Set(months)]
      .sort()
      .reverse();
  }

  getArchivedTasksByMonth(month: string): Task[] {
    return this.archivedTasks
      .filter(task =>
        task.archiveDate?.startsWith(month)
      )
      .sort((a, b) =>
        (b.archiveDate ?? '')
          .localeCompare(a.archiveDate ?? '')
      );
  }

  formatArchiveMonth(month: string): string {
    const parts = month.split('-');

    const year = Number(parts[0]);
    const monthNumber = Number(parts[1]);

    if (this.language === 'en') {
      return `${monthNumber}/${year}`;
    }

    if (this.language === 'zh') {
      return `${year}年${monthNumber}月`;
    }

    if (this.language === 'ko') {
      return `${year}년 ${monthNumber}월`;
    }

    return `${year}年${monthNumber}月`;
  }

  deleteTask(task: Task): void {
    this.tasks =
      this.tasks.filter(
        t => t.id !== task.id
      );

    if (this.selectedTask?.id === task.id) {
      this.selectedTask = null;
    }
  }

  get todayTasks(): Task[] {
    return this.tasks.filter(
      task => task.status === 'todo'
    );
  }

  get laterTasks(): Task[] {
    return this.tasks.filter(
      task => task.status === 'later'
    );
  }

  get todayOffTasks(): Task[] {
    return this.tasks.filter(
      task => task.status === 'todayOff'
    );
  }

  get buriedTasks(): Task[] {
    return this.tasks.filter(
      task => task.status === 'buried'
    );
  }

  get sproutedTasks(): Task[] {
    return this.tasks.filter(
      task => task.status === 'sprouted'
    );
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(
      task => task.status === 'completed'
    );
  }

  get archivedTasks(): Task[] {
    return this.tasks.filter(
      task =>
        task.status === 'released' ||
        task.status === 'delegated' ||
        task.status === 'unknown' ||
        task.status === 'questioned'
    );
  }

  ngAfterViewInit(): void {
    this.drawLogo();
  }

  drawLogo(): void {
    const canvas = this.logoCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const width = 260;
    const height = 80;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const fontSize = 58;

    ctx.font = `700 ${fontSize}px sans-serif`;

    const poryuColors = [
      '#D8B4C8',
      '#B8C9D9',
      '#C5D5B5',
      '#E1C99A',
      '#C9B8D9',
      '#D9B5A5',
      '#B8D0C8',
      '#D6C3B5',
      '#C7C0D9',
      '#D9C4A7'
    ];

    const poryuColor =
      poryuColors[
        Math.floor(
          Math.random() * poryuColors.length
        )
      ];

    ctx.fillStyle = poryuColor;

    const letters = ['P', 'O', 'R', 'Y', 'U'];

    const positions = [
      35,
      85,
      135,
      185,
      235
    ];

    letters.forEach((letter, index) => {
      ctx.fillText(
        letter,
        positions[index],
        40
      );
    });

    ctx.font = '11px sans-serif';

    ctx.fillStyle = '#000000';

    ctx.fillText(
      '・◡・',
      85,
      40
    );
  }
}