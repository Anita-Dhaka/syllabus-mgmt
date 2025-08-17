import { Flex } from "@chakra-ui/react";
import { Outlet } from "@tanstack/react-router";

export default function Syllabus(){

    return (
        <>
        <Flex justifyContent={'center'} p='4' m='10px'>
            <Outlet />
        </Flex>
        </>
    )
}