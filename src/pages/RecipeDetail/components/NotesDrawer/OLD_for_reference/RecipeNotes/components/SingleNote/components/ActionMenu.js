import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { colors } from '../../../../../../colors'

export const ActionMenu = ({ type, displayedNoteType, isPinned, isAdmin, isNoteOwner, onDelete, onPin, onFlag }) => {
  return (
    <div className='SingleNote__actionMenu'>
      <Menu>
        <MenuButton as={IconButton} aria-label='Options' icon={<MoreVertIcon />} variant='flat' />
        <MenuList>
          {type === 'note' && (displayedNoteType === 'personal' || isAdmin) && (
            <MenuItem _hover={{ bg: colors.primary[5] }} _focus={{ bg: colors.primary[5] }} onClick={() => onPin()}>
              {isPinned ? 'Unpin' : 'Pin'}
            </MenuItem>
          )}
          {(displayedNoteType === 'community'
            // && !isNoteOwner
          ) && (
              <MenuItem _hover={{ bg: colors.primary[5] }} _focus={{ bg: colors.primary[5] }} onClick={() => onFlag()}>
                Flag
              </MenuItem>
            )}
          {(isNoteOwner || isAdmin) && (
            <MenuItem _hover={{ bg: colors.primary[5] }} _focus={{ bg: colors.primary[5] }} onClick={() => onDelete()}>
              Delete
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </div>
  )
}
