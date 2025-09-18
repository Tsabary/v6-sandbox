export const ComponentsReportDialogJsx = `import { useMemo, useState } from 'react';
import {
  handleError,
  reportReasons,
  useUser,
  useCreateReport,
} from '@replyke/react-js';
import { FlagIcon, LoaderCircleIcon } from 'lucide-react';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

const ReportPostSheet = ({ setShowReportPostDialog, entity }) => {
  const { user } = useUser();
  const { createEntityReport } = useCreateReport();

  const [submitting, setSubmitting] = useState(false);
  const [reason, setReason] = useState(null);

  const buttonActive = useMemo(() => !!reason && !!entity, [reason, entity]);

  const handleSubmitReport = async () => {
    try {
      if (!entity) throw new Error('No entity to report selected');
      if (!reason) throw new Error('No reason to report selected');
      if (!user) {
        alert('Oops! Login Required');
        return;
      }

      setSubmitting(true);
      await createEntityReport({ targetId: entity.id, reason });
      setShowReportPostDialog(false);
      setReason(null);
      alert('Report submitted successfully');
    } catch (err) {
      handleError(err, 'Submitting report failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <FlagIcon className="mr-2 size-5" />
          Submit a report
        </DialogTitle>
        <DialogDescription>
          Thank you fo looking out for our community. Let us know what is
          happening, and we'll look into it.
        </DialogDescription>
      </DialogHeader>
      <div className="mt-2 flex flex-row flex-wrap gap-1.5">
        {Object.entries(reportReasons).map(([key, value], index) => (
          <Button
            onClick={() => setReason(key)}
            size="sm"
            variant="secondary"
            className={cn(
              'px-2 py-1 text-xs',
              key === reason
                ? 'bg-stone-800 text-white hover:bg-stone-800'
                : 'bg-secondary hover:bg-secondary',
            )}
            key={index}
          >
            {value}
          </Button>
        ))}
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => setShowReportPostDialog(false)}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleSubmitReport}
          disabled={!buttonActive}
        >
          {submitting && (
            <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
          )}
          {submitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ReportPostSheet;
`;
