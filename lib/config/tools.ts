import {
  GitHubDark,
  GitHubLight,
  Gmail,
  GoogleDrive,
  Linear,
  Notion,
  Slack,
  XDark,
  XLight,
} from '@ridemountainpig/svgl-react';
import type { ComponentType } from 'react';
import { GoogleCalendarIcon } from '@/components/icons/google-calendar';
import { GoogleDocsIcon } from '@/components/icons/google-docs';
import { GoogleSheetsIcon } from '@/components/icons/google-sheets';
import type { ConnectorType } from '@/lib/types';

export interface ConnectorConfig {
  type: ConnectorType;
  displayName: string;
  icon: ComponentType<{ className?: string }>;
  icon_light?: ComponentType<{ className?: string }>;
  description: string;
  authConfigId: string;
}

export const CONNECTOR_CONFIGS: Record<ConnectorType, ConnectorConfig> = {
  gmail: {
    type: 'gmail',
    displayName: 'Gmail',
    icon: Gmail,
    description: 'Access and manage your Gmail messages directly from chat.',
    authConfigId: process.env.NEXT_PUBLIC_GMAIL_AUTH_CONFIG_ID || 'gmail_oauth',
  },
  googlecalendar: {
    type: 'googlecalendar',
    displayName: 'Google Calendar',
    icon: GoogleCalendarIcon,
    description: 'View and schedule events in your Google Calendar.',
    authConfigId:
      process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_AUTH_CONFIG_ID ||
      'googlecalendar_oauth',
  },
  googledrive: {
    type: 'googledrive',
    displayName: 'Google Drive',
    icon: GoogleDrive,
    description: 'Access and manage your Google Drive files and folders.',
    authConfigId:
      process.env.NEXT_PUBLIC_GOOGLE_DRIVE_AUTH_CONFIG_ID ||
      'googledrive_oauth',
  },
  notion: {
    type: 'notion',
    displayName: 'Notion',
    icon: Notion,
    description: 'Read and write to your Notion workspace pages.',
    authConfigId:
      process.env.NEXT_PUBLIC_NOTION_AUTH_CONFIG_ID || 'notion_oauth',
  },
  googledocs: {
    type: 'googledocs',
    displayName: 'Google Docs',
    icon: GoogleDocsIcon,
    description: 'Create, edit, and collaborate on Google Docs documents.',
    authConfigId:
      process.env.NEXT_PUBLIC_GOOGLE_DOCS_AUTH_CONFIG_ID || 'googledocs_oauth',
  },
  googlesheets: {
    type: 'googlesheets',
    displayName: 'Google Sheets',
    icon: GoogleSheetsIcon,
    description: 'Work with spreadsheets and data in Google Sheets.',
    authConfigId:
      process.env.NEXT_PUBLIC_GOOGLE_SHEETS_AUTH_CONFIG_ID ||
      'googlesheets_oauth',
  },
  slack: {
    type: 'slack',
    displayName: 'Slack',
    icon: Slack,
    description: 'Send messages and interact with your Slack workspace.',
    authConfigId: process.env.NEXT_PUBLIC_SLACK_AUTH_CONFIG_ID || 'slack_oauth',
  },
  linear: {
    type: 'linear',
    displayName: 'Linear',
    icon: Linear,
    description: 'Manage issues and projects in Linear.',
    authConfigId:
      process.env.NEXT_PUBLIC_LINEAR_AUTH_CONFIG_ID || 'linear_oauth',
  },
  github: {
    type: 'github',
    displayName: 'GitHub',
    icon: GitHubDark,
    icon_light: GitHubLight,
    description: 'Manage repositories, issues, and pull requests on GitHub.',
    authConfigId:
      process.env.NEXT_PUBLIC_GITHUB_AUTH_CONFIG_ID || 'github_oauth',
  },
  twitter: {
    type: 'twitter',
    displayName: 'X (Twitter)',
    icon: XDark,
    icon_light: XLight,
    description: 'Post tweets and interact with your X (Twitter) account.',
    authConfigId:
      process.env.NEXT_PUBLIC_TWITTER_AUTH_CONFIG_ID || 'twitter_oauth',
  },
};

export const SUPPORTED_CONNECTORS: ConnectorType[] = Object.keys(
  CONNECTOR_CONFIGS
) as ConnectorType[];

export const getConnectorConfig = (type: ConnectorType): ConnectorConfig => {
  const config = CONNECTOR_CONFIGS[type];
  if (!config) {
    throw new Error(`Unknown connector type: ${type}`);
  }
  return config;
};

// Connector tool detection configuration
export const CONNECTOR_TOOL_NAMES = SUPPORTED_CONNECTORS;

/**
 * Check if a tool name corresponds to a connector tool
 */
export const isConnectorTool = (toolName: string): boolean => {
  const lowerToolName = toolName.toLowerCase();

  // Check for specific patterns that indicate connector tools
  return (
    lowerToolName.includes('gmail') ||
    lowerToolName.includes('calendar') ||
    lowerToolName.includes('notion') ||
    lowerToolName.includes('drive') ||
    lowerToolName.includes('docs') ||
    lowerToolName.includes('sheets') ||
    lowerToolName.includes('slack') ||
    lowerToolName.includes('linear') ||
    lowerToolName.includes('github') ||
    lowerToolName.includes('twitter') ||
    lowerToolName.includes('x.com')
  );
};

/**
 * Determine the connector type from a tool name
 */
export const getConnectorTypeFromToolName = (
  toolName: string
): ConnectorType => {
  const lowerToolName = toolName.toLowerCase();

  if (lowerToolName.includes('gmail')) {
    return 'gmail';
  }
  if (lowerToolName.includes('calendar')) {
    return 'googlecalendar';
  }
  if (lowerToolName.includes('notion')) {
    return 'notion';
  }
  if (lowerToolName.includes('drive')) {
    return 'googledrive';
  }
  if (lowerToolName.includes('docs')) {
    return 'googledocs';
  }
  if (lowerToolName.includes('sheets')) {
    return 'googlesheets';
  }
  if (lowerToolName.includes('slack')) {
    return 'slack';
  }
  if (lowerToolName.includes('linear')) {
    return 'linear';
  }
  if (lowerToolName.includes('github')) {
    return 'github';
  }
  if (lowerToolName.includes('twitter') || lowerToolName.includes('x.com')) {
    return 'twitter';
  }

  // Default fallback - this should not happen if isConnectorTool returns true
  return 'gmail';
};
