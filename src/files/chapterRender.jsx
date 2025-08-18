import { useParams, useNavigate, useLocation } from "@tanstack/react-router";
import { chapterRenderRoute, chapterRoute, classSubjectRoute } from "../main";
import { Flex, Text, Button } from "@chakra-ui/react";
import { chapterData, subjectData } from "./dataComponent";

export default function ChapterRender() {
  const { chapterId } = useParams({ from: chapterRenderRoute.id });
  const navigate = useNavigate()
  const localChapterData = JSON.parse(localStorage.getItem("data"))
  let Data = localChapterData.find((data) => data.id == chapterId)
  const classId = Data.classId
  const subjectId = Data.subjectId

  const chapter = localChapterData.find(
    (data) =>
      String(data.id) === String(chapterId) &&
      String(data.classId) === String(classId) &&
      String(data.subjectId) === String(subjectId)
  );

  function handleBackNavigation() {
    if (classId && subjectId) {
      navigate({
        from: classSubjectRoute.fullPath,
        to: classSubjectRoute.to,
        search: {
          classId: classId,
          subjectId: subjectId,
          chapterId: Number(chapterId),
        },
        replace: true,
      })
    }
  }

  if (!chapter) {
    return <Text>No chapter found</Text>;
  }

  return (
    <Flex direction="column" gap="4" p="4" justifyContent={'space-around'} alignItems={'center'}>
      <Flex ml='280px' gap='200px'>
        <Text as="h2" fontWeight="bold" ml='-28'>{chapter.title}</Text>
        <Button size='sm' w='80px' p='0' onClick={() => handleBackNavigation()}>Back</Button>
      </Flex>
      <Flex gap="4">
        <Text><b>Class:</b> {chapter.classId}</Text>
        <Text><b>Subject: </b>
          {subjectData.filter((data) => data.id === chapter.subjectId).map((d) => d.subjectName)}
        </Text>
      </Flex>
      <Flex direction="column" gap="2" ml='-10'>
        {chapter.section.map((section, i) => (
          <Text key={section.id} fontWeight={'medium'} >{`${i + 1}. ${section.name}`}</Text>
        ))}
      </Flex>
    </Flex>
  );
}