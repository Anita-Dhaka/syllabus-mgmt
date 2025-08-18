import { useNavigate, useSearch } from "@tanstack/react-router";
import { classSubjectRoute } from "../main";
import { useEffect, useState } from "react";
import { Flex, NativeSelect, Text, } from "@chakra-ui/react";
import { classData, subjectData } from "./dataComponent";
import ChapterSelect from "./chapter";

export default function ClassSubject() {

    const search = useSearch({ from: classSubjectRoute.id });
    const [classUrlValue, setClassUrlValue] = useState(search.classId ?? null)
    const [subjectUrlValue, setSubjectUrlValue] = useState(search.subjectId ?? null)
    const navigate = useNavigate()
    let subjectIdArray = classData.find((data) => classUrlValue == data.className)?.subjectsId || [];

    useEffect(() => {
        if ((classUrlValue)) { 
            navigate({
                to: classSubjectRoute.to,
                search: {
                    classId: classUrlValue,
                    subjectId: subjectUrlValue
                },
                replace: true,
            })
        }
    }, [classUrlValue, subjectUrlValue, navigate])
    
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const keysToDelete = [];
    for (const [key, value] of params.entries()) {
        if (value === '' || value === 'null' || value == 0 || isNaN(value)) { 
            keysToDelete.push(key);
        }
    }

    for (const key of keysToDelete) {
        params.delete(key);
    }
    history.replaceState(null, '', url.toString());

    return (
        <>
            <Flex direction='column' gap='6' ml='2'>
                <Flex gap='5'>
                    <NativeSelect.Root variant='outline' size="sm" width="150px">
                        <NativeSelect.Field defaultValue={search.classId} placeholder="Select Class" value={classUrlValue} onChange={(e) => {
                            setClassUrlValue(Number(e.currentTarget.value)),
                                setSubjectUrlValue(0),
                                search.subjectId = null
                        }}>
                            {classData.map((data) => (
                                <option key={data.id} value={data.className}>
                                    {data.className}
                                </option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <NativeSelect.Root variant='outline' size="sm" width="230px">
                        <NativeSelect.Field placeholder="Select Subject" defaultValue={search.subjectId} value={subjectUrlValue} onChange={(e) => setSubjectUrlValue(Number(e.currentTarget.value))}>
                            {subjectData.filter((data) => subjectIdArray.includes(data.id)).map((data) => (
                                <option key={data.id} value={data.id}>
                                    {data.subjectName}
                                </option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Flex>
                {classUrlValue === null || subjectUrlValue === null || (classUrlValue <= 0 || subjectUrlValue <= 0) && (<Text as='p'>Select Class and Subject</Text>)}
                {classUrlValue > 0 && subjectUrlValue > 0 && (<ChapterSelect classId={classUrlValue} subjectId={subjectUrlValue} />)}
            </Flex>
        </>
    )
}

// one page two search params when subject selected url change when class selected no changes