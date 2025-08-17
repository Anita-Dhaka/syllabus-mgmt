import { Stack, Accordion, Flex, Editable, Button, ButtonGroup, Span, Field, Input, Group, List, Drawer, CloseButton, Portal } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { chapterData } from "./dataComponent"
import { chapterRenderRoute, chapterRoute, classSubjectRoute } from "../main"

export default function ChapterSelect({ subjectId, classId }) {

    const search = useSearch({ from: classSubjectRoute.id });
    const [chapterUrlValue, setChapterUrlValue] = useState()
    const [newChapterData, setNewChapterData] = useState([...chapterData]);
    const navigate = useNavigate()

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
    const [formShow, setFormShow] = useState(false);
    const [newChapter, setNewChapter] = useState("");
    const [editId, setEditId] = useState(null);
    const [editChapterTitle, setEditChapterTitle] = useState("")
    const inputRef = useRef(null)
    const [sectionList, setSectionList] = useState([{ id: 1, name: '', content: '' }])
    const [newSection, setNewSection] = useState('')

    function handleChapterSelect(id) {
        navigate({
            to: chapterRenderRoute.to,
            params: { chapterId: id },
            search: { classId, subjectId },
        });
    }

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
                            <Link
                                to={chapterRenderRoute.to}
                                params={{ chapterId: data.id }}
                                search={{ classId, subjectId }}
                            >
                                <Accordion.Item key={data.id} value={data.id} >
                                    <Flex gap='4'>
                                        <Accordion.ItemTrigger onClick={() => handleChapterSelect(data.id)}>
                                            <Span flex="1">
                                                {`${i + 1}. ${data.title}`}
                                            </Span>
                                        </Accordion.ItemTrigger>

                                        <ButtonGroup variant='plain' size='xs' >
                                            <Button color={'blue.500'} onClick={() => handleEditChapter(data.id)}>Edit</Button>
                                            <Button color={'blue.500'} onClick={() => handleRemoveChapter(data.id)}>Remove</Button>
                                        </ButtonGroup>
                                    </Flex>
                                </Accordion.Item>
                            </Link>
                        ))}
                    </Accordion.Root>

                    {/* {formShow && renderForm()} */}
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
        setFormShow(true);
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
            setFormShow(false);
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