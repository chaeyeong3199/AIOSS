from pathlib import Path


def test_l08_artifacts_exist():
    assert Path('.github/actions/python-setup/action.yml').exists()
    assert Path('.github/workflows/python-quality.yml').exists()
    assert Path('assignments/L08/optimization-report.md').exists()


def test_l08_workflow_contains_optimization_keywords():
    workflow_text = Path('.github/workflows/python-ci.yml').read_text(encoding='utf-8')
    reusable_text = Path('.github/workflows/python-quality.yml').read_text(encoding='utf-8')
    action_text = Path('.github/actions/python-setup/action.yml').read_text(encoding='utf-8')

    assert 'cache: pip' in action_text
    assert 'workflow_call' in reusable_text
    assert 'matrix:' in reusable_text
    assert 'dorny/paths-filter@v3' in workflow_text
    assert 'requirements-dev.txt' in reusable_text
    assert 'quality:' in workflow_text