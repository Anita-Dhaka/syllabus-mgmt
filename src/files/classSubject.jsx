import { useNavigate, useSearch } from "@tanstack/react-router";
import { classSubjectRoute } from "../main";
import { useEffect, useState } from "react";
import { Flex, NativeSelect, Text, } from "@chakra-ui/react";
import { classData, subjectData } from "./dataComponent";
import ChapterSelect from "./chapter";

export default function ClassSubject() {

    const search = useSearch({ from: classSubjectRoute.id });
    const [classUrlValue, setClassUrlValue] = useState(1);
    const [subjectUrlValue, setSubjectUrlValue] = useState(null);
    const navigate = useNavigate()
    let subjectIdArray = classData.find((data) => classUrlValue == data.className)?.subjectsId || [];

    useEffect(() => {
        if (classUrlValue && subjectUrlValue) {
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

    return (
        <>
            <Flex direction='column' gap='6' ml='2'>
                <Flex gap='5'>
                    <NativeSelect.Root variant='outline' size="sm" width="150px">
                        <NativeSelect.Field defaultValue={search.classId} placeholder="Select Class" value={classUrlValue} onChange={(e) => setClassUrlValue(Number(e.currentTarget.value))}>
                            {classData.map((data) => (
                                <option key={data.id} value={data.className}>
                                    {data.className}
                                </option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <NativeSelect.Root variant='outline' size="sm" width="230px">
                        <NativeSelect.Field placeholder="Select Subject" value={subjectUrlValue} onChange={(e) => setSubjectUrlValue(Number(e.currentTarget.value))}>
                            {subjectData.filter((data) => subjectIdArray.includes(data.id)).map((data) => (
                                <option key={data.id} value={data.id}>
                                    {data.subjectName}
                                </option>
                            ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Flex>
                {classUrlValue === null || subjectUrlValue === null && (<Text as='p'>Select Class and Subject</Text>)}
                {classUrlValue && subjectUrlValue && (<ChapterSelect classId={classUrlValue} subjectId={subjectUrlValue} />)}
            </Flex>
        </>
    )
}
