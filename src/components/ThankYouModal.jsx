import { Dialog, Card, CardBody, Typography } from "@material-tailwind/react";

export default function ThankYouModal({ setIsSuccess, isSuccess }) {
  const handleOpen = () => setIsSuccess((cur) => !cur);
  return (
    <>
      <Dialog open={isSuccess} size="sm" handler={handleOpen}>
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Thank you for your interest in Transloom
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Your access request has been submitted, and you will be notified
              via email when your request is approved. .
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
             Note that we are currently prioritizing enterprise customers, which may affect the timing of invitations.
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
            We appreciate your understanding and patience during this process!
            </Typography>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
