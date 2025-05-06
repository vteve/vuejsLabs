interface Point {
    x: number;
    y: number;
  }
  
  function distance(x1: number, y1: number, x2: number, y2: number): number;
  function distance(p1: Point, p2: Point): number;
  function distance(a: number | Point, b: number | Point, c?: number, d?: number): number {
    if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number' && typeof d === 'number') {
      return Math.sqrt((a - c) ** 2 + (b - d) ** 2);
    } else if (typeof a === 'object' && typeof b === 'object') {
      return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    }
    throw new Error('Invalid arguments');
  }
  
  console.log(distance(0, 0, 3, 4));
  console.log(distance({x: 0, y: 0}, {x: 3, y: 4}));