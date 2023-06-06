import { useState, useEffect } from 'react';
import { Box, Button, ChakraProvider, Center, FormControl, FormLabel, Heading, Input, Text, VStack, Flex } from '@chakra-ui/react';

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState('');
  const [initialTime, setInitialTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedTimeLeft, setPausedTimeLeft] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        } else {
          clearInterval(timer);
          setIsRunning(false);
          playAlarmSound();
        }
      }, 1000);
    } else {
      setPausedTimeLeft(timeLeft);
    }

    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeLeft]);

  const handleStart = () => {
    if (countdown !== '') {
      setInitialTime(parseInt(countdown, 10));
      setTimeLeft(parseInt(countdown, 10));
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleContinue = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleRestart = () => {
    setTimeLeft(initialTime);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCountdown('');
    setTimeLeft(0);
    stopAlarmSound();
    if (audio) {
      audio.pause(); // Stop the audio playback
      audio.currentTime = 0; // Reset the audio to the beginning
    }
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
  const playAlarmSound = () => {
    setIsAlarmPlaying(true);
    const audioElement = new Audio('ring2.mp3');
    audioElement.play();
    setAudio(audioElement);
  };

  const stopAlarmSound = () => {
    setIsAlarmPlaying(false);
    if (audio) {
      if (isPaused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
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
                borderColor={'#3E4149'}
              />
            </FormControl>
            <Box>
              {isRunning ? (
                <Text fontSize="4xl" color="teal.500">
                  {formatTime(timeLeft)}
                </Text>
              ) : (
                <Text fontSize="4xl" color="gray.500">
                  {isPaused ? (pausedTimeLeft !== null ? formatTime(pausedTimeLeft) : 'Paused') : formatTime(timeLeft)}
                </Text>
              )}
            </Box>
            {!isRunning && countdown !== '' && !isPaused && (
              <Button colorScheme="teal" onClick={handleStart} size="lg">
                Start
              </Button>
            )}
            {isRunning && (
              <Button colorScheme="red" onClick={handlePause} size="lg">
                Pause
              </Button>
            )}
            {!isRunning && isPaused && (
              <Flex direction={{base:"column", md:"row"}} gap={3}>
                <Button colorScheme="teal" onClick={handleContinue} size="lg">
                  Continue
                </Button>
                <Button colorScheme="blackAlpha" onClick={handleRestart} size="lg">
                  Restart
                </Button>
                <Button colorScheme="red" onClick={handleReset} size="lg">
                  Reset
                </Button>
              </Flex>
            )}
            {isAlarmPlaying && (
              <Button colorScheme="teal" onClick={stopAlarmSound} size="lg">
                Stop Sound
              </Button>
            )}
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default CountdownTimer;
