import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCalendarStore = create(
  persist(
    (set) => ({
      selectedYear: new Date().getFullYear(),
      monthImages: {},
      coverImage: null,
      backCoverImage: null,
      setSelectedYear: (year) => set({ selectedYear: year }),
      setMonthImage: (year, monthIndex, imageUrl) =>
        set((state) => ({
          monthImages: {
            ...state.monthImages,
            [`${year}-${monthIndex}`]: imageUrl,
          },
        })),
      setCoverImage: (imageUrl) => set({ coverImage: imageUrl }),
      setBackCoverImage: (imageUrl) => set({ backCoverImage: imageUrl }),
    }),
    {
      name: 'calendar-storage',
    }
  )
);
