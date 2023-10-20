// Graphs are data structures made of nodes and links ( vertices and edges )
// G = (V, E)

class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  static load(info) {
    const points = info.points.map((point) => new Point(point.x, point.y));
    const segments= info.segments.map((seg) => new Segment(
        points.find((p) => p.equals(seg.p1)),
        points.find((p) => p.equals(seg.p2))
    ))
    return new Graph(points,segments);
  }
  hash() {
    return JSON.stringify(this);
  }

  addPoint(point) {
    this.points.push(point);
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  containsPoint(point) {
    return this.points.find((p) => p.equals(point));
  }

  containsSegment(segment) {
    return this.segments.find((p) => p.equals(segment));
  }
  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  tryAddSegment(segment) {
    if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
      this.addSegment(segment);
      return true;
    }
    return false;
  }
  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }
  removePoint(point) {
    const segments = this.getSegmentsWithPoint(point);
    for (const seg of segments) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  getSegmentsWithPoint(point) {
    const segments = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segments.push(seg);
      }
    }
    return segments;
  }

  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
