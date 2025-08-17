import { useParams, useNavigate } from "@tanstack/react-router";
import { chapterRenderRoute, chapterRoute } from "../main";
import { Flex, Text  } from "@chakra-ui/react";
import { chapterData } from "./dataComponent";
import { useSearch } from "@tanstack/react-router";

export default function ChapterRender() {
  const { chapterId } = useParams({ from: chapterRenderRoute.id });
  const { classId, subjectId } = useSearch({ from: chapterRenderRoute.id });

  const chapter = chapterData.find(
    (data) =>
      String(data.id) === String(chapterId) &&
      String(data.classId) === String(classId) &&
      String(data.subjectId) === String(subjectId)
  );

  if (!chapter) {
    return <Text>No chapter found</Text>;
  }

  return (
    <Flex direction="column" gap="4" p="4" justifyContent={'space-around'} alignItems={'center'}>
      <Text as="h2" fontWeight="bold" ml='-20'>{chapter.title}</Text>
      <Flex gap="4">
        <Text><b>Class:</b> {chapter.classId}</Text>
        <Text><b>Subject:</b> {chapter.subjectId}</Text>
      </Flex>
      <Flex direction="column" gap="2" ml='-10'>
        {chapter.section.map((section, i) => (
          <Text key={section.id} fontWeight={'medium'} >{`${i+1}. ${section.name}`}</Text>
        ))}
      </Flex> 
    </Flex>
  );
}
