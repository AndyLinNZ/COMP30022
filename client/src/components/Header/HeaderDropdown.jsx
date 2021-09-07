import React from 'react'
import { Box, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import ProfileIcon from 'components/svg/ProfileIcon'
import { useUserDetails } from 'hooks'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'

const HeaderDropdown = () => {
    const { user } = useUserDetails()
    const router = useRouter()
    const menuItems = [
        {
            name: 'MY TEAMS',
            path: appPaths.DASHBOARD_TEAMS_PATH,
        },
        {
            name: 'MY LEAGUES',
            path: appPaths.DASHBOARD_LEAGUES_PATH,
        },
        {
            name: 'PROFILE',
        },
        {
            name: 'LOG OUT',
        },
    ]
    return (
        <Menu placement="top-end">
            <MenuButton as={Box} cursor="pointer">
                <HStack spacing={1}>
                    <ProfileIcon />
                    <Text>{user?.firstName}</Text>
                    <ChevronDownIcon />
                </HStack>
            </MenuButton>
            <MenuList minWidth="160px" fontSize="1.25rem">
                {menuItems.map(({ name, path }) => (
                    <MenuItem
                        key={`${name}`}
                        justifyContent="flex-end"
                        onClick={() => router.push(path)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default HeaderDropdown
