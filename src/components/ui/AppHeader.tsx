import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeProvider';
import { useI18n } from '../../hooks/useI18n';

interface HeaderProps {
  title: string;
  subtitle: string;
  showSearchButton?: boolean;
  onSearchPress?: () => void;
}

export const AppHeader: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showSearchButton = false,
  onSearchPress,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerText}>
          <Text style={[styles.heading, { color: colors.textPrimary }]}>{title}</Text>
          <Text style={[styles.subheading, { color: colors.textSecondary }]}>{subtitle}</Text>
        </View>
        {showSearchButton && (
          <TouchableOpacity
            style={[styles.searchButton, { backgroundColor: colors.surfaceSecondary }]}
            onPress={onSearchPress}
            activeOpacity={0.7}
          >
            <Ionicons name="search-outline" size={24} color={colors.iconPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const ControlSection: React.FC<SectionProps> = ({ title, children }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{title}</Text>
      {children}
    </View>
  );
};

interface ButtonRowProps {
  children: React.ReactNode;
}

export const ButtonRow: React.FC<ButtonRowProps> = ({ children }) => {
  return <View style={styles.row}>{children}</View>;
};

interface LoadingIndicatorProps {
  text?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ text }) => {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <View style={styles.loading}>
      <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
        {text || t('loading.text')}
      </Text>
    </View>
  );
};

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search-outline',
  title,
  subtitle,
  actionText,
  onActionPress,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.emptyContainer}>
      <Ionicons name={icon as any} size={48} color={colors.textTertiary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>{subtitle}</Text>
      )}
      {actionText && onActionPress && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.surfaceSecondary }]}
          onPress={onActionPress}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionButtonText, { color: colors.textTertiary }]}>
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
  },
  subheading: {
    marginTop: 2,
    fontSize: 14,
  },
  searchButton: {
    padding: 8,
    marginLeft: 12,
    borderRadius: 8,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
