export class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | null {
        if (this.isEmpty()) {
        return null;
        }
        return this.items.shift() || null;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}