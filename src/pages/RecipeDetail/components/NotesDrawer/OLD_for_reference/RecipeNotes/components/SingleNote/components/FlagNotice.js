import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { colors } from '../../../../../../colors'

export const FlagNotice = ({ onDelete, onFlag }) => (
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='red'>
      Flagged
    </MenuButton>
    <MenuList>
      <MenuItem
        _hover={{ bg: colors.primary[5] }}
        _focus={{ bg: colors.primary[5] }}
        style={{ color: '#27377a' }}
        onClick={() => onFlag()}
      >
        Approve
      </MenuItem>
      <MenuItem
        _hover={{ bg: colors.primary[5] }}
        _focus={{ bg: colors.primary[5] }}
        style={{ color: '#27377a' }}
        onClick={() => onDelete()}
      >
        Delete
      </MenuItem>
    </MenuList>
  </Menu>
)
