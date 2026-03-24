export interface AmenitySlotStruct {
  startTime: Date;
  endTime: Date;
  available: boolean;
  remainingCapacity: number;
}

export interface AmenitySlotArrayStruct {
  slots: AmenitySlotStruct[];
}
