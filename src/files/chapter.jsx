import { Stack, Accordion, Flex, Editable, Button, ButtonGroup, Span, Field, Input, Group, List, } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { chapterData } from "./dataComponent"
import { chapterRoute, classSubjectRoute } from "../main"
// import Section from "./section"

export default function ChapterSelect({ subjectId, classId }) {

    const search = useSearch({ from: classSubjectRoute.id });
    const [chapterUrlValue, setChapterUrlValue] = useState('')
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
                    chapterId: chapterUrlValue,
                },
                replace: true,
            })
        }
    }, [chapterUrlValue, navigate])

    const [formShow, setFormShow] = useState(false);
    const [newChapter, setNewChapter] = useState("");
    const [editId, setEditId] = useState(null);
    const [editChapterTitle, setEditChapterTitle] = useState("")
    const inputRef = useRef(null)
    const [sectionList, setSectionList] = useState([])
    const [newSection, setNewSection] = useState('')

    return (
        <>
            <Flex gap='100px'>
                <Stack gap="4" w='300px'>
                    {!formShow && subjectId && (
                        <Button
                            variant='outline' size='sm'
                            onClick={() => {
                                handleAddChapter()
                            }
                            }>
                            Add new Chapter
                        </Button>
                    )}
                    <Accordion.Root variant='subtle' collapsible value={chapterUrlValue} onValueChange={(e) => setChapterUrlValue(e.value)}>
                        {newChapterData.filter((data) => data.classId == classId && data.subjectId == subjectId).map((data) => (
                            <Accordion.Item key={data.id} value={data.id}>
                                <Flex gap='4'>
                                    <Accordion.ItemTrigger>
                                        <Span flex="1">
                                            {editId === data.id ? (
                                                <Flex gap="2" align="center">
                                                    <Editable.Root
                                                        value={editChapterTitle}
                                                        onValueChange={(e) => setEditChapterTitle(e.value)}
                                                        placeholder={data.title}
                                                    >
                                                        <Editable.Preview minH="48px" alignItems="flex-center" width="full" />
                                                        <Editable.Input />
                                                    </Editable.Root>
                                                    <Button
                                                        size="xs"
                                                        variant="outline"
                                                        onClick={handleUpdateChapter}
                                                    >
                                                        Update
                                                    </Button>
                                                </Flex>
                                            ) : (
                                                data.title
                                            )}
                                        </Span>
                                    </Accordion.ItemTrigger>

                                    <ButtonGroup variant='plain' size='xs' >
                                        <Button color={'blue.200'} onClick={() => handleEditChapter(data.id)}>Edit</Button>
                                        <Button color={'blue.200'} onClick={() => handleRemoveChapter(data.id)}>Remove</Button>
                                    </ButtonGroup>
                                </Flex>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>

                    {formShow && renderForm()}
                </Stack>
                {/* {chaptesIdValue && <ChapterContent classId={classId} subjecsId={subjecsId} chaptesId={chaptesIdValue} />} */}
                {/* {chaptesIdValue && <Section classId={classId} subjecsId={subjecsId} chaptesId={chaptesIdValue} />} */}
            </Flex>
        </>
    )

    function renderForm() {
        return (
            <Field.Root ml={'8px'} mt='4'>
                <Field.Label mb='2'>Add chapter title and sections</Field.Label>
                <Flex gap='4' direction={'column'}>
                    <Input ref={inputRef} w={'300px'} placeholder="Enter Title of Chapter" value={newChapter} onChange={(e) => setNewChapter(e.target.value)} />
                    <Group attached w="full" maxW="sm">
                        <Input flex="1" placeholder="Enter section for chapter" value={newSection} onChange={(e) => setNewSection(e.target.value)} />
                        <Button bg="bg.subtle" variant="outline" onClick={handleAddSection}>
                            +
                        </Button>
                    </Group>
                    {sectionList.length > 0 && (
                        <List.Root ml='10'>
                            {sectionList.map((d, i) => (
                                <List.Item key={i}>{d.name}</List.Item>
                            ))}
                        </List.Root>
                    )}
                    <Button
                        variant="outline"
                        size='sm'
                        mb='100px'
                        onClick={handleUpdateChapter}
                        w='150px'
                    >Update Chapter
                    </Button>
                </Flex>
            </Field.Root>
        )
    }

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
        setFormShow(true);
        setTimeout(() => inputRef.current.focus(), 0)
    }

    function handleUpdateChapter() {
        if (editId !== null) {
            const updatedChapters = newChapterData.map((chap) =>
                chap.id === editId ? { ...chap, title: editChapterTitle } : chap
            );
            setNewChapterData(updatedChapters);
            setEditId(null);
            setEditChapterTitle('');
            setSectionList('')
            setNewSection('');
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
        }
    }

    function handleEditChapter(id) {
        const chapter = newChapterData.find((c) => c.id === id);
        setFormShow(false)
        setEditId(id)
        setEditChapterTitle(chapter?.title || '');
        setSectionList(chapter?.section || []);
    }

    function handleAddSection() {
        if (newSection.trim() === '') return;
        const newSecObj = {
            id: sectionList.length + 1,
            name: newSection,
            content: ''
        };
        setSectionList([...sectionList, newSecObj]);
        setNewSection('');
    }
}