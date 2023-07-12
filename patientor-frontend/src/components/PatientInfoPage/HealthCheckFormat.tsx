import { ListItem, ListItemText, List, Typography } from '@mui/material';
import { MedicalInformation } from '@mui/icons-material';
import diagnosticsIdentifier from '../DiagnosticsIdentifier';
import { healthStatusIcon } from '../IconTranslator';
import { EntryInput } from './index';

const HealthCheckFormat = ({ entry, diagnoses }: EntryInput) => {
  return (
    <List>
      <ListItem>
        <ListItemText sx={{ mb: -2 }}>{entry.date}</ListItemText>
        <MedicalInformation />
      </ListItem>
      <ListItem>
        <ListItemText sx={{ fontStyle: 'italic' }}>
          {entry.description}
        </ListItemText>
      </ListItem>
      {entry.diagnosisCodes?.map((c, k) => (
        <ListItem key={k}>
          <ListItemText
            sx={{
              mb: 0,
              mt: -1,
              ml: 2,
              fontStyle: 'italic',
              fontWeight: 800,
            }}>
            {diagnoses !== null ? diagnosticsIdentifier(c, diagnoses) : null}
          </ListItemText>
        </ListItem>
      ))}
      <ListItem>{healthStatusIcon(entry)}</ListItem>
      <ListItem>
        <Typography>diagnosis by {entry.specialist}</Typography>
      </ListItem>
    </List>
  );
};

export default HealthCheckFormat;
