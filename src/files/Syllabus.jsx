import { Flex } from "@chakra-ui/react";
import { Outlet } from "@tanstack/react-router";

export default function Syllabus(){

    return (
        <>
        <Flex justifyContent={'center'}>
            <Outlet />
        </Flex>
        </>
    )
}