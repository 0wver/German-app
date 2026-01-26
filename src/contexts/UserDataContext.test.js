import React, { useEffect } from 'react';
import { render, act } from '@testing-library/react';
import { UserDataProvider, useUserData } from './UserDataContext';

describe('UserDataContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('measures time for rapid updates (Performance)', async () => {
    const ITERATIONS = 1000;

    // We can spy on localStorage.setItem
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const startTime = performance.now();

    // Capture the update function
    let updateStatsFn;

    const TestComponent = () => {
        const { updateStats } = useUserData();
        updateStatsFn = updateStats;
        return null;
    }

    await act(async () => {
      render(
        <UserDataProvider>
           <TestComponent />
        </UserDataProvider>
      );
    });

    // Now trigger updates one by one.
    // We wrap each update in act to ensure effects run.
    for (let i = 0; i < ITERATIONS; i++) {
        await act(async () => {
            updateStatsFn({ pointsEarned: i });
        });
    }

    const endTime = performance.now();
    console.log(`Time taken for ${ITERATIONS} updates: ${endTime - startTime}ms`);
    console.log(`localStorage.setItem called ${setItemSpy.mock.calls.length} times`);

    // Expect significantly fewer calls than iterations
    expect(setItemSpy.mock.calls.length).toBeLessThan(ITERATIONS);
  });

  test('saves data after debounce', async () => {
    jest.useFakeTimers();
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    let updateStatsFn;
    const TestComponent = () => {
        const { updateStats } = useUserData();
        updateStatsFn = updateStats;
        return null;
    }

    await act(async () => {
      render(
        <UserDataProvider>
          <TestComponent />
        </UserDataProvider>
      );
    });

    await act(async () => {
      updateStatsFn({ pointsEarned: 10 });
    });

    expect(setItemSpy).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setItemSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('saves data on beforeunload', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    let updateStatsFn;
    const TestComponent = () => {
        const { updateStats } = useUserData();
        updateStatsFn = updateStats;
        return null;
    }

    await act(async () => {
      render(
        <UserDataProvider>
          <TestComponent />
        </UserDataProvider>
      );
    });

    await act(async () => {
        updateStatsFn({ pointsEarned: 20 });
    });

    // Clear previous calls if any (e.g. from initial load if mocked differently)
    setItemSpy.mockClear();

    // Trigger beforeunload
    const event = new Event('beforeunload');
    act(() => {
        window.dispatchEvent(event);
    });

    expect(setItemSpy).toHaveBeenCalled();
  });
});
