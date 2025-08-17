import { Box, Flex } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";

export default function LinksComponent() {
    return (
        <>
            <Flex justifyContent={'center'} mt='15px'>
                <Box alignContent={'center'}>
                    <Link to='/syllabus'>Syllabus</Link>
                </Box>
            </Flex>
        </>
    )
}