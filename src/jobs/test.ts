import cron from "node-cron";

// This is a test job that will log something every 5 seconds
export const testCron = (time: number) => {
  cron.schedule(`*/${time} * * * * *`, () => {
    console.log(`Logging something every ${time} seconds`);
  });
};

// this job will console.log ⏲️ every day at 10:42 AM
export const testCron2 = () => {
  cron.schedule(`42 10 * * *`, () => {
    console.log(`⏲️ 10:42 AM`);
  });
};
