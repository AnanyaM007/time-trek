import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Center,
  CircularProgress,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time / 100) % 60);
    const milliseconds = time % 100;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <ChakraProvider>
      <Box p={4} bg="gray.100" borderRadius="md">
        <Center>
          <VStack spacing={4} align="center">
            <Heading as="h1" size="xl" color="teal.500">
              Stopwatch
            </Heading>
            <HStack spacing={4} align="center">
              <Box
                bg="gray.50"
                borderRadius="md"
                boxShadow="xl"
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100px"
                h="100px"
              >
                <Text fontSize="3xl">{Math.floor(time / 6000).toString().padStart(2, '0')}</Text>
              </Box>
              <Box
                bg="gray.50"
                borderRadius="md"
                boxShadow="xl"
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100px"
                h="100px"
              >
                <Text fontSize="3xl">{Math.floor((time / 100) % 60).toString().padStart(2, '0')}</Text>
              </Box>
              <Box
                bg="gray.50"
                borderRadius="md"
                boxShadow="xl"
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100px"
                h="100px"
              >
                <Text fontSize="3xl">{(time % 100).toString().padStart(2, '0')}</Text>
              </Box>
            </HStack>
            <Box w="200px" h="200px" position="relative">
              <CircularProgress
                value={time}
                max={6000}
                color="teal.500"
                thickness="8px"
                size="180px"
              />
              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-60%, -65%)"
                fontSize="2xl"
              >
                {formatTime(time)}
              </Text>
            </Box>
            <HStack spacing={4}>
              <Button colorScheme="teal" onClick={handleStart} disabled={isRunning} size="lg">
                Start
              </Button>
              <Button colorScheme="red" onClick={handleStop} disabled={!isRunning} size="lg">
                Stop
              </Button>
              <Button colorScheme="gray" onClick={handleReset} size="lg">
                Reset
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default Stopwatch;
