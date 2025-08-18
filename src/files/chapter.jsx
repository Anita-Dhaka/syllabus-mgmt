import { Stack, Accordion, Flex, Editable, Button, ButtonGroup, Span, Field, Input, Group, List, Drawer, CloseButton, Portal } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { chapterData } from "./dataComponent"
import { chapterRenderRoute, chapterRoute, classSubjectRoute } from "../main"


// see as this 
// context store data globally 
// if i add data to context when local storage change it will solve the problem 
// means at start chapter data will be added and later as the local storage update data will update 
// i can use context data to render and all in newChapterData
// means change context when newChapterData changes

// another way store chapterData in context and then use it in chapterRender and in chapter
// update context whenever there is a change in newChapterData

// create context file add chapterData 
// wrap main in provider
// use in chapterRender and chapter
// update every time newChapterData is updated
// ? how to add, how to update
// how to add
// const { myArray, addToArray } = useContext(MyArrayContext);

//       return (
//         <div>
//           <ul>
//             {myArray.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//           <button onClick={() => addToArray('newItem' + (myArray.length + 1))}>Add Item</button>
//         </div>
//       );
//     };

//     export default MyComponent;
// ------ take a look at this for updation
//   import React, { createContext, useState } from 'react';

//     export const MyArrayContext = createContext();

//     export const MyArrayProvider = ({ children }) => {
//       const [myArray, setMyArray] = useState([]); // Initial empty array

//       return (
//         <MyArrayContext.Provider value={{ myArray, setMyArray }}>
//           {children}
//         </MyArrayContext.Provider>
//       );
//     };

    // import React, { useContext, useState } from 'react';
    // import { MyArrayContext } from './MyArrayContext'; // Path to your context file

    // const MyComponent = () => {
    //   const { setMyArray } = useContext(MyArrayContext);
    //   const [localStateValue, setLocalStateValue] = useState('');

    //   const handleUpdateArray = () => {
    //     // Create a *new* array based on the current context array
    //     // and your local state value to trigger a re-render.
    //     setMyArray(prevArray => [...prevArray, localStateValue]); 
    //     setLocalStateValue(''); // Clear local state after adding
    //   };

    //   return (
    //     <div>
    //       <input 
    //         type="text" 
    //         value={localStateValue} 
    //         onChange={(e) => setLocalStateValue(e.target.value)} 
    //       />
    //       <button onClick={handleUpdateArray}>Add to Context Array</button>
    //     </div>
    //   );
    // };


export default function ChapterSelect({ subjectId, classId }) {

    const search = useSearch({ from: classSubjectRoute.id });
    const [chapterUrlValue, setChapterUrlValue] = useState()
    const [newChapterData, setNewChapterData] = useState([...chapterData]);
    const navigate = useNavigate()

    //set new chapter data to localStorage
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(newChapterData))
    }, [newChapterData])

    // useEffect(() => {
    //     const storedData = localStorage.getItem("data")
    //     if (storedData) {
    //         setNewChapterData(JSON.parse(storedData))
    //     }
    // }, [newChapterData])
    // get data from localStorage and use it to prevent changes as 
    // const localChapterData = JSON.parse(localStorage.getItem("data"))
    // get it in state and replace newChapterData with localChapterData

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const keysToDelete = [];
    for (const [key, value] of params.entries()) {
        if (value === '' || value === 'null' || isNaN(value)) {
            keysToDelete.push(key);
        }
    }
    for (const key of keysToDelete) {
        params.delete(key);
    }
    history.replaceState(null, '', url.toString());

    function handleChapterSelect(id) {
        navigate({
            to: chapterRenderRoute.to,
            params: { chapterId: id },
        });
    }

    useEffect(() => {
        if (classId && subjectId) {
            navigate({
                from: classSubjectRoute.fullPath,
                to: classSubjectRoute.to,
                search: {
                    classId: classId,
                    subjectId: subjectId,
                    chapterId: Number(chapterUrlValue),
                },
                replace: true,
            })
        }
    }, [chapterUrlValue, navigate])

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [newChapter, setNewChapter] = useState("");
    const [editId, setEditId] = useState(null);
    const [editChapterTitle, setEditChapterTitle] = useState("")
    const inputRef = useRef(null)
    const [sectionList, setSectionList] = useState([{ id: 1, name: '', content: '' }])
    const [newSection, setNewSection] = useState('')

    return (
        <>
            <Flex gap='100px'>
                <Stack gap="4" w='400px'>
                    <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} initialFocusEl={() => ref.current}>
                        <Drawer.Trigger asChild>
                            <Button variant="outline" size="sm" w='150px' ml='250px' onClick={handleAddChapter}>
                                Add Chapter
                            </Button>
                        </Drawer.Trigger>
                        <Portal>
                            <Drawer.Backdrop />
                            <Drawer.Positioner>
                                <Drawer.Content>
                                    <Drawer.Header>
                                        <Drawer.Title>Add chapter</Drawer.Title>
                                    </Drawer.Header>
                                    <Drawer.Body>
                                        <p>Add chapter and section</p>
                                        <Stack mt="5">
                                            <Field.Root ml={'8px'} mt='4'>
                                                <Field.Label mb='2'>Add chapter title</Field.Label>
                                                <Flex gap='4' direction={'column'}>
                                                    <Input
                                                        ref={inputRef}
                                                        w="240px"
                                                        placeholder="Enter Title of Chapter"
                                                        value={editId !== null ? editChapterTitle : newChapter}
                                                        onChange={(e) => {
                                                            if (editId !== null) setEditChapterTitle(e.target.value);
                                                            else setNewChapter(e.target.value);
                                                        }}
                                                    />

                                                    <Field.Label>Add Sections</Field.Label>

                                                    {sectionList.map((sec, i) => (
                                                        <Flex key={sec.id} align="center" gap="2">
                                                            <Input
                                                                w="200px"
                                                                placeholder={`Section ${i + 1}`}
                                                                value={sec.name}
                                                                onChange={(e) => handleSectionChange(sec.id, e.target.value)}
                                                            />
                                                            <Button
                                                                size="sm"
                                                                colorScheme="red"
                                                                variant="outline"
                                                                onClick={() => handleRemoveSection(sec.id)}
                                                            >
                                                                <b>x</b>
                                                            </Button>
                                                        </Flex>
                                                    ))}

                                                    <Button
                                                        w="120px"
                                                        bg="bg.subtle"
                                                        variant="outline"
                                                        onClick={handleAddSection}
                                                    >
                                                        Add section
                                                    </Button>
                                                </Flex>
                                            </Field.Root>
                                        </Stack>
                                    </Drawer.Body>
                                    <Drawer.Footer>
                                        <Button variant="outline" onClick={(() => setIsDrawerOpen(false))}>Cancel</Button>
                                        <Button onClick={handleUpdateChapter}>Save</Button>
                                    </Drawer.Footer>
                                </Drawer.Content>
                            </Drawer.Positioner>
                        </Portal>
                    </Drawer.Root>
                    <Accordion.Root variant='subtle' value={chapterUrlValue} onValueChange={(e) => setChapterUrlValue(e.value)}>
                        {newChapterData.filter((data) => data.classId == classId && data.subjectId == subjectId).map((data, i) => (
                            <Accordion.Item key={data.id} value={data.id} >
                                <Flex gap='4'>
                                    <Button variant={'plain'} textAlign={'start'} w='280px' onClick={() => handleChapterSelect(data.id)}>
                                        <Span flex="1">
                                            {`${i + 1}. ${data.title}`}
                                        </Span>
                                    </Button>

                                    <ButtonGroup variant='plain' size='xs' >
                                        <Button color={'blue.500'} onClick={() => handleEditChapter(data.id)}>Edit</Button>
                                        <Button color={'blue.500'} onClick={() => handleRemoveChapter(data.id)}>Remove</Button>
                                    </ButtonGroup>
                                </Flex>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>
                </Stack>
            </Flex>
        </>
    )

    function handleRemoveChapter(id) {
        console.log("Removing chapter with id: ", id);
        let chapData = newChapterData.filter((data) => data.id != id);
        console.log("Chapter removed is ", id);
        console.log("New chapter data before removing: ", newChapterData);
        setNewChapterData([...chapData]);
        setChapterUrlValue('');
    }

    function handleAddChapter() {
        setEditId(null)
        setIsDrawerOpen(true)
        setTimeout(() => inputRef.current.focus(), 0)
    }

    function handleUpdateChapter() {
        if (editId !== null) {
            const updatedChapters = newChapterData.map((chap) =>
                chap.id === editId
                    ? { ...chap, title: editChapterTitle, section: [...sectionList] }
                    : chap
            );
            setNewChapterData(updatedChapters);
            setEditId(null);
            setEditChapterTitle('');
            setSectionList([]);
            setNewSection('');
            setIsDrawerOpen(false);
        }
        else {
            let finalSections = [...sectionList];
            if (newSection.trim() !== '') {
                finalSections.push({
                    id: sectionList.length + 1,
                    name: newSection,
                    content: ''
                });
            }
            let newObject = {
                id: newChapterData.length + 1,
                classId: classId,
                subjectId: subjectId,
                title: newChapter,
                section: finalSections
            };
            console.log("newObject ", newObject.id)
            setNewChapterData([...newChapterData, newObject]);
            console.log(newChapterData)
            setNewChapter('')
            setSectionList([]);
            setNewSection('')
            setIsDrawerOpen(false)
        }
    }

    function handleEditChapter(id) {
        const chapter = newChapterData.find((c) => c.id === id);
        setEditId(id);
        setEditChapterTitle(chapter?.title || '');
        setSectionList(chapter?.section || []);
        setIsDrawerOpen(true);
    }

    function handleAddSection() {
        const newSecObj = {
            id: sectionList.length + 1,
            name: "",
            content: ""
        };
        setSectionList([...sectionList, newSecObj]);
    }

    function handleRemoveSection(id) {
        const updatedSections = sectionList.filter((sec) => sec.id !== id);
        setSectionList(updatedSections);
    }

    function handleSectionChange(id, value) {
        setSectionList((prev) =>
            prev.map((sec) =>
                sec.id === id ? { ...sec, name: value } : sec
            )
        );
    }
}

// chapter/5 only, the search params should be removed --- i need to pass data to chapterRender from chapter as when we'll go to chapterRender the params we need will be lost ---
// when we go back to chapter page from chapter render page the data that was added, removed and edited get lost ---


// edit and remove are not working ---- done
// when user select- select subject there should be a msg saying select subject, right now we are getting 0 --- done
// while selecting class subject should get reset --- done
// if there are no values in url then url should not be shown --- done
// in chapter render page change subject id to name of subject --- done
// when class is selected it is not shown in params --- done
// when class is selected class is coming as classId=1&subjectId=0 remove 0 --- done
// when chapter is added with sections and later we go to that particular chapter no sections are shown, same on edit when edited data get lost when we go to chapterRender, use local storage --- done
// when adding chapter/7 in place of chapter/5 we should navigate to chapter 7 of that class and subject --- done