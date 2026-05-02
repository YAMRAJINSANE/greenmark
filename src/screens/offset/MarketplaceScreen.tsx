import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDERS, SHADOWS } from '../../theme';
import { Input, ScreenContainer, Card, Badge } from '../../components';
import { DUMMY_OFFSET_PROJECTS } from '../../data/dummy';

interface MarketplaceProps {
  onSelectProject: (projectId: string) => void;
}

export const MarketplaceScreen: React.FC<MarketplaceProps> = ({ onSelectProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filters = ['Forest', 'Solar', 'Biogas', 'Wind'];

  const filteredProjects = DUMMY_OFFSET_PROJECTS.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !selectedFilter || project.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderProject = ({ item }: { item: typeof DUMMY_OFFSET_PROJECTS[0] }) => (
    <Card
      image={item.image}
      onPress={() => onSelectProject(item.id)}
      style={styles.projectCard}
    >
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text style={styles.projectLocation}>📍 {item.location}</Text>
        </View>
        {item.verified && (
          <Badge label="Verified" variant="success" icon="✓" />
        )}
      </View>

      <View style={styles.projectStats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>{item.families}</Text>
          <Text style={styles.statValue}>Families</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>{item.co2Offset}</Text>
          <Text style={styles.statValue}>CO₂ tons</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>₹{item.price}</Text>
          <Text style={styles.statValue}>Per Credit</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.offsetButton}
        onPress={() => onSelectProject(item.id)}
      >
        <Text style={styles.offsetButtonText}>Offset Now →</Text>
      </TouchableOpacity>
    </Card>
  );

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Offset Projects</Text>
      <Text style={styles.subtitle}>Choose a verified project to offset your emissions</Text>

      {/* Search */}
      <Input
        placeholder="Search projects..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      {/* Filters */}
      <View style={styles.filterContainer}>
        <FlatList
          data={filters}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilter === item && styles.filterChipActive,
              ]}
              onPress={() =>
                setSelectedFilter(selectedFilter === item ? null : item)
              }
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === item && styles.filterChipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
      </View>

      {/* Projects List */}
      <FlatList
        data={filteredProjects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.sora,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginBottom: SPACING.lg,
  },
  searchInput: {
    marginBottom: SPACING.lg,
  },
  filterContainer: {
    marginBottom: SPACING.lg,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDERS.radius.full,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    marginRight: SPACING.md,
    backgroundColor: COLORS.white,
  },
  filterChipActive: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.successLight,
  },
  filterChipText: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  filterChipTextActive: {
    color: COLORS.success,
  },
  listContent: {
    paddingBottom: SPACING.lg,
  },
  projectCard: {
    marginBottom: SPACING.md,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.neutral900,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  projectLocation: {
    fontSize: TYPOGRAPHY.sizes.bodySmall,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
    marginTop: SPACING.xs,
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.neutral200,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.sora,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.neutral600,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
  offsetButton: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  offsetButtonText: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.success,
    fontFamily: TYPOGRAPHY.fonts.inter,
  },
});

export default MarketplaceScreen;
