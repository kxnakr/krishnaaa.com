"use client";

import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar";

const MyGithubCalendar = () => {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center">
      <GitHubCalendar
        username="krishna8421"
        blockMargin={2}
        blockRadius={2.5}
        blockSize={8}
        colorScheme={theme as "light" | "dark"}
        fontSize={12}
      />
    </div>
  );
};

export default MyGithubCalendar;
