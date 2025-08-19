import { createContext, useState, useEffect } from "react";
import { chapterData as initialChapterData } from "./dataComponent";

export const ChapterContext = createContext();

export default function ChapterProvider({ children }) {
  const [chapters, setChapters] = useState(() => {
    const stored = localStorage.getItem("nnewchaptersHere");
    return stored ? JSON.parse(stored) : initialChapterData;
  });

  useEffect(() => {
    localStorage.setItem("nnewchaptersHere", JSON.stringify(chapters));
  }, [chapters]);

  function addChapter(newChapter) { // not working data is adding but not showing 
    // id is not increasing so first number with that is showing up
    setChapters((prev) => [...prev, newChapter]);
    console.log("After adding chapter ", chapters)
    console.log("Chapters length ", chapters.length + 1)
  }

  function updateChapter(id, updatedChapter) {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedChapter } : c))
    );
  }

  function removeChapter(id) { 
    setChapters((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <ChapterContext.Provider
      value={{ chapters, addChapter, updateChapter, removeChapter }}
    >
      {children}
    </ChapterContext.Provider>
  );
}
