import React from 'react'
import { Box, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import ProfileIcon from 'components/svg/ProfileIcon'
import { useUserDetails } from 'hooks'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { appPaths } from 'utils/constants'
import { useRouter } from 'next/router'
import {
    PeopleAltOutlined,
    GroupWorkOutlined,
    ExitToAppOutlined,
    AccountCircleOutlined,
} from '@material-ui/icons'

const HeaderDropdown = () => {
    const { user } = useUserDetails()
    const router = useRouter()
    const menuItems = [
        {
            name: 'MY TEAMS',
            path: appPaths.DASHBOARD_TEAMS_PATH,
            icon: <PeopleAltOutlined />,
        },
        {
            name: 'MY LEAGUES',
            path: appPaths.DASHBOARD_LEAGUES_PATH,
            icon: <GroupWorkOutlined />,
        },
        {
            name: 'PROFILE',
            icon: <AccountCircleOutlined />,
        },
        {
            name: 'LOG OUT',
            icon: <ExitToAppOutlined />,
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
                {menuItems.map(({ name, path, icon }) => (
                    <MenuItem
                        key={`${name}`}
                        justifyContent="flex-end"
                        onClick={() => router.push(path)}
                        icon={icon}
                    >
                        {name}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default HeaderDropdown
