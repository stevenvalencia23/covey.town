import React, { useCallback, useState } from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import useMaybeVideo from '../../hooks/useMaybeVideo';
import Player, { Character } from '../../classes/Player';

const CharacterSettings: React.FunctionComponent = () => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const video = useMaybeVideo()
  
  //TODO: might not need some of this
  const {apiClient, currentTownID, userName, myPlayerID} = useCoveyAppState();

  const [currentPlayer, setCurrentPlayer] = useState<string>(userName); //TODO this might be all wrong
  const [characterUpdateAvatar, setCharacterUpdateAvatar] = useState<Character>();

  const openSettings = useCallback(()=>{
    onOpen();
    video?.pauseGame();
  }, [onOpen, video]);

  const closeSettings = useCallback(()=>{
    onClose();
    video?.unPauseGame();
  }, [onClose, video]);

  const toast = useToast()
  const processUpdates = async (action: string) =>{
    try {
        await apiClient. ///update the character
        updateTown({
          coveyTownID: currentTownID,
          coveyTownPassword: roomUpdatePassword,
          friendlyName,
          isPubliclyListed
        });
        toast({
          title: 'Character Avatar updated',
          description: '',
          status: 'success'
        })
        closeSettings();
      }catch(err){
        toast({
          title: 'Unable to update character avatar',
          description: err.toString(),
          status: 'error'
        });
      }
    }
  };

  return <>
    <MenuItem data-testid='openMenuButton' onClick={openSettings}>
      <Typography variant="body1">Character Settings</Typography>
    </MenuItem>
    <Modal isOpen={isOpen} onClose={closeSettings}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Edit Avatar of {username} ({userName})</ModalHeader>
        <ModalCloseButton/>
        <form onSubmit={(ev)=>{ev.preventDefault(); processUpdates('edit')}}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='friendlyName'>Friendly Name</FormLabel>
              <Input id='friendlyName' placeholder="Friendly Name" name="friendlyName" value={friendlyName} onChange={(ev)=>setFriendlyName(ev.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor='isPubliclyListed'>Publicly Listed</FormLabel>
              <Checkbox id="isPubliclyListed" name="isPubliclyListed"  isChecked={isPubliclyListed} onChange={(e)=>setIsPubliclyListed(e.target.checked)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="updatePassword">Town Update Password</FormLabel>
              <Input data-testid="updatePassword" id="updatePassword" placeholder="Password" name="password" type="password" value={roomUpdatePassword} onChange={(e)=>setRoomUpdatePassword(e.target.value)} />
            </FormControl>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  </>
}


export default CharacterSettings;
