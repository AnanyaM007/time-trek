import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        } else {
          clearInterval(timer);
          setIsRunning(false);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (countdown !== '') {
      setTimeLeft(parseInt(countdown, 10));
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCountdown('');
    setTimeLeft(0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCountdown(value);
  };

  const formatTime = (time: number) => {
    if (time === 0) {
      return '0:0';
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <ChakraProvider>
      <Box p={10} bg="gray.100" borderRadius="md">
        <Center>
          <VStack spacing={4} align="center">
            <Heading as="h1" size="xl" color="teal.500">
              Countdown Timer
            </Heading>
            <FormControl>
              <FormLabel mb={5} htmlFor="countdown-input" fontSize="lg">
                Set Countdown (in seconds)
              </FormLabel>
              <Input
                type="number"
                id="countdown-input"
                value={countdown}
                onChange={handleChange}
                w="200px"
                size="lg"
                borderColor={"#3E4149"}
              />
            </FormControl>
            <Box>
              {isRunning ? (
                <Text fontSize="4xl" color="teal.500">
                  {formatTime(timeLeft)}
                </Text>
              ) : (
                <Text fontSize="4xl" color="gray.500">
                  {formatTime(countdown === '' ? 0 : parseInt(countdown, 10))}
                </Text>
              )}
            </Box>
            {!isRunning && countdown !== '' && (
              <Button colorScheme="teal" onClick={handleStart} size="lg">
                Start
              </Button>
            )}
            {isRunning && (
              <Button colorScheme="red" onClick={handleReset} size="lg">
                Stop
              </Button>
            )}
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default CountdownTimer;
