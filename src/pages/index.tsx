import { useState } from 'react';
import { Box, Button, ChakraProvider, Flex, VStack, Drawer, DrawerBody, DrawerContent, DrawerOverlay, useDisclosure, Image, Text } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import CountdownTimer from './countdowntimer';
import Stopwatch from './stopwatch';

const IndexPage = () => {
  const [selectedPage, setSelectedPage] = useState('timer');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePageSelect = (page: string) => {
    setSelectedPage(page);
    onClose(); // Close the drawer when a page is selected
  };

  return (
    <ChakraProvider>
      <Box sx={{bg: '#3E4149', minH:"100vh"}}>
      <Flex sx={{ align: 'center' }} pt={6} pl={10} pb={4} pr={10} justifyContent={"space-between"}>
        <Flex flexDirection={"row"} gap={3}>
          <Image src='logo.png' height={"40px"}></Image>
          <Box fontWeight="600" fontSize="2xl" color="white">TimeTrek</Box>
        </Flex>
        <Flex display={{ base: 'none', md: 'flex' }}>
        <VStack spacing={4} flexDirection={"row"}>
          <Button
            onClick={() => handlePageSelect('timer')}
            colorScheme={selectedPage === 'timer' ? 'teal' : 'gray'}
            size="lg"
          >
            Countdown Timer
          </Button>
          <Button
            onClick={() => handlePageSelect('stopwatch')}
            colorScheme={selectedPage === 'stopwatch' ? 'teal' : 'gray'}
            size="lg"
          >
            Stopwatch
          </Button>
        </VStack>
      </Flex>
        <Flex display={{ base: 'block', md: 'none' }}>
          <Button
            variant="ghost"
            colorScheme="teal"
            aria-label="Toggle Navigation"
            onClick={onOpen}
            sx={{fontSize:"30px"}}
          >
            <HamburgerIcon />
          </Button>
        </Flex>
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0}>
            <Flex direction="column" h="full">
              <Button
                onClick={onClose}
                variant="ghost"
                colorScheme="teal"
                leftIcon={<CloseIcon />}
                mt={4}
              >
                Close
              </Button>
              <VStack spacing={4} mt={4}>
                <Button
                  onClick={() => handlePageSelect('timer')}
                  colorScheme={selectedPage === 'timer' ? 'teal' : 'gray'}
                  size="lg"
                >
                  Countdown Timer
                </Button>
                <Button
                  onClick={() => handlePageSelect('stopwatch')}
                  colorScheme={selectedPage === 'stopwatch' ? 'teal' : 'gray'}
                  size="lg"
                >
                  Stopwatch
                </Button>
              </VStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
      <Box p={4}>
        <VStack spacing={4} mt={4}>
          {selectedPage === 'timer' ? <CountdownTimer /> : <Stopwatch />}
        </VStack>
      </Box>
      </Box>
    </ChakraProvider>
  );
};

export default IndexPage;
