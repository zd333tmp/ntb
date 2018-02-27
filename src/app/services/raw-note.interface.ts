/**
 * Raw note data.
 * Notes are serialized and stored on back-end in this shape.
 * All properties are readonly for immutability purposes.
 */
export interface RawNote {
  readonly id: string;
  readonly caption: string;
  readonly text: string;
  readonly keywords: Array<string>;
  /**
   * ISO time stamp string.
   */
  readonly timeStamp: string;
}
